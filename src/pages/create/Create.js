// styles
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import './Create.css';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';
import useCollection from '../../hooks/useCollection';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];
export default function Create() {
  const { documents } = useCollection();
  const { user } = useAuthContext();
  const [users, setUsers] = useState('');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);
  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!category) {
      setError('please select a category');
      return;
    }
    if (assignedUsers.length < 1) {
      setError('please assign the project to atleast one user');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL,
    };
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.uid,
      };
    });
    const project = {
      name,
      details,
      dueDate: timestamp,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
    };
    console.log(name, details, dueDate, category.value, assignedUsers);
  }

  return (
    <div className='create-form'>
      <h2 className='page -title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            type='text'
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label htmlFor=''>
          <span>Project Category:</span>

          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label htmlFor=''>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className='btn' type='submit'>
          Add Project
        </button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
