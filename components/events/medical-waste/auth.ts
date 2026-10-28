/**
 * SHA-256 of the event admin password; the password itself never ships in the code. The browser uses
 * it to unlock the kiosk admin panel, and the live-room API checks it server-side before any host action.
 * It's a light gate for a staffed booth, not account security.
 */
export const ADMIN_HASH = "5b09bd3cdf42f1a500413821a2536cf89f5f1924f4c0a1661b35a3ad5480f839";
