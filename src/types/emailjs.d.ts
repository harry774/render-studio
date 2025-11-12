// Type declaration for EmailJS browser SDK
// This is a minimal declaration to satisfy TypeScript when types are not found in node_modules.
// If @emailjs/browser adds official types later, you can remove this file.

declare module "@emailjs/browser" {
  export function init(userID: string): void;
  export function send(serviceID: string, templateID: string, templateParams?: any, userID?: string): Promise<any>;
  export function sendForm(serviceID: string, templateID: string, form: HTMLFormElement | string, userID?: string): Promise<any>;
  const defaultExport: {
    init: typeof init;
    send: typeof send;
    sendForm: typeof sendForm;
  };
  export default defaultExport;
}
