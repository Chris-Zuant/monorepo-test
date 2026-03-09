export async function sendWelcomeEmail(name: string): Promise<string> {
  return `Welcome email sent to ${name}`;
}