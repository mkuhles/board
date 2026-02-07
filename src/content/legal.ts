export const LEGAL_CONTACT = {
  name: "Melanie Kuhles",
  addressLines: ["Dorfstr. 11", "15299 Müllrose", "Deutschland"],
  email: "melanie.kuhles@oder-spree-consulting.de",
};

export function getLegalVars() {
  const contact = [
    LEGAL_CONTACT.name,
    ...LEGAL_CONTACT.addressLines,
    `E-Mail: [${LEGAL_CONTACT.email}](mailto:${LEGAL_CONTACT.email})`,
  ].join("  \n");

  return {
    contact,
    name: LEGAL_CONTACT.name,
  };
}
