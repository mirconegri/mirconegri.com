import { on, select } from './dom';

export type ContactError = 'required' | 'email' | 'consent';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

type StatusKey = ContactError | 'sending' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Second gate before the network: native validation already covers the no-script path. */
export function validateContact(payload: ContactPayload, consent: boolean): ContactError | null {
  if (payload.name.trim().length === 0 || payload.message.trim().length === 0) return 'required';
  if (!EMAIL_PATTERN.test(payload.email.trim())) return 'email';
  if (!consent) return 'consent';
  return null;
}

export function initContact(): void {
  const form = select<HTMLFormElement>('[data-contact]');
  if (!form) return;

  const status = select<HTMLElement>('[data-contact-status]', form);
  const submit = select<HTMLButtonElement>('button[type="submit"]', form);

  const text = (key: StatusKey): string => {
    const suffix = document.documentElement.lang === 'it' ? 'It' : 'En';
    const attribute = `msg${key.charAt(0).toUpperCase()}${key.slice(1)}${suffix}`;
    return form.dataset[attribute] ?? '';
  };

  const setStatus = (key: StatusKey, state: 'error' | 'success' | '') => {
    if (!status) return;
    status.textContent = text(key);
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  on(form, 'submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    if (String(data.get('_gotcha') ?? '').length > 0) {
      form.reset();
      setStatus('success', 'success');
      return;
    }

    const consent = select<HTMLInputElement>('input[name="consent"]', form)?.checked ?? false;
    const payload: ContactPayload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const invalid = validateContact(payload, consent);
    if (invalid) {
      setStatus(invalid, 'error');
      return;
    }

    submit?.setAttribute('disabled', '');
    setStatus('sending', '');

    try {
      const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
      form.reset();
      setStatus('success', 'success');
    } catch (cause) {
      console.error('Contact form submission failed', cause);
      setStatus('error', 'error');
    } finally {
      submit?.removeAttribute('disabled');
    }
  });
}
