export const columns = [
  {
    title: '#:',
    getDataVal: ({ id }) => id,
    setDataVal: (id) => ({ id }),
  },
  {
    title: 'Name:',
    getDataVal: ({ name: fName }) => fName,
    setDataVal: (name) => ({ name }),
  },
  {
    title: 'Email:',
    getDataVal: ({ email }) => (
      <a href={`mailto:${email}`}>{email}</a>
    ),
    // setDataVal: (email) => ({ email }),
  },
  {
    title: 'Address:',
    getDataVal: ({ address: { street, suite, city } }) =>
      `${city}, ${street}, ${suite}`,
  },
  {
    title: 'Phone number:',
    getDataVal: ({ phone }) => (
      <a href={`tel:${phone}`}>{phone}</a>
    ),
    // setDataVal: (phone) => ({ phone }),
  },
  {
    title: 'Website:',
    getDataVal: ({ website }) => (
      <a href={`https://${website}`}>{website}</a>
    ),
    // setDataVal: (website) => ({ website }),
  },
  {
    title: 'Company name:',
    getDataVal: ({ company: { name: cName } }) => cName,
  },
];
