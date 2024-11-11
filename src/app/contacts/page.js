import ContactForm from "@/components/contacts/form/form";
import HeroContacts from "@/components/contacts/hero/hero";
import ContactMap from "@/components/contacts/maps/maps";
import Social from "@/components/contacts/social/social";

export default function Contacts() {
  return (
    <>
    <HeroContacts></HeroContacts>
    {/*<ContactForm></ContactForm>*/}
    <Social></Social>
    <ContactMap></ContactMap>
    </>
  );
}