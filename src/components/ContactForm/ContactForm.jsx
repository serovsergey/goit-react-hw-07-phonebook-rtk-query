import { useState } from 'react'
import { toast } from 'react-toastify';
import { useAddContactMutation, useGetContactsQuery } from 'redux/contacts/contacts';
// import PropTypes from 'prop-types'
import s from './ContactForm.module.scss'

export const ContactForm = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const formFields = { name: setName, phone: setPhone };
  const { data: items = [], isFetching } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    formFields[name](value);
  }

  const onSubmitForm = async evt => {
    evt.preventDefault();
    const searchingName = name.toLowerCase();
    if (items.some(item => item.name.toLowerCase() === searchingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    try {
      await addContact({ name, phone }).unwrap();
      toast.info('Contact created!')
      Object.values(formFields).forEach(setField => setField(''));
    } catch (error) {
      toast.error(error.data.msg);
    }
  }

  return (
    <>
      <form className={s.form} onSubmit={onSubmitForm}>
        <label>Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onInputChange}
          />
        </label>
        <label>Number
          <input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={phone}
            onChange={onInputChange}
          />
        </label>
        <button type='submit'>Add contact</button>
      </form>
      {isFetching && <p>Creating new contact...</p>}
    </>
  )
}

// ContactForm.propTypes = {}

export default ContactForm
