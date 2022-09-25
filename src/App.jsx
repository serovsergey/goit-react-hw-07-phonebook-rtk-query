import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Section from "./components/Section";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <main>
      <Section>
        <h1>Phonebook</h1>
        <hr />
      </Section>
      <Section>
        <h2>Add new contact</h2>
        <ContactForm />
      </Section>
      <Section title="Contact list">
        <Filter />
        <ContactList />
      </Section>
      <ToastContainer />
    </main>
  );
};
