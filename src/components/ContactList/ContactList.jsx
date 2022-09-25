// import PropTypes from 'prop-types'
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import s from './ContactList.module.scss'
import { getFilter } from 'redux/filterReducer/selector.filter';
import { useDeleteContactMutation, useGetContactsQuery } from 'redux/contacts/contacts';
import { toast } from 'react-toastify';

export const ContactList = () => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { data: items = [], isFetching } = useGetContactsQuery();
  const filter = useSelector(getFilter);
  const deletingId = useRef(null);

  const handleDeleteItem = async (id) => {
    if (!isFetching && !isDeleting) {
      deletingId.current = id;
      try {
        await deleteContact(id).unwrap();
        toast.warning('Contact deleted!')
        deletingId.current = null;
      } catch (error) {
        toast.error(error.data);
      }
    }
  }

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter(record => record.name.toLowerCase().includes(normalizedFilter))
  }, [items, filter]);

  return (
    <>
      <ul className={s.list}>
        {filteredContacts.map(({ id, name, phone }) => (
          <li key={id} className={(isDeleting && deletingId.current === id) ? ` ${s.deleting}` : ''}>
            <span>{name}: {phone}</span>
            <button onClick={() => handleDeleteItem(id)} disabled={isDeleting && deletingId.current === id}>✖</button>
          </li>
        ))}
      </ul>
      {isFetching && <p>Loading...</p>}
    </>
  )
}

// ContactList.propTypes = {}

export default ContactList
