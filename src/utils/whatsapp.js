// Direct wa.me/<phone> deep link — NOT the old wa.me/message/<id> shortlink.
// The shortlink format is a Meta-hosted Click-to-WhatsApp template tied to a
// server-side message, so it can't carry a `?text=` param. This is the phone
// number from the footer contact line, in international format, no symbols.
const WHATSAPP_PHONE = '201080375883'

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
