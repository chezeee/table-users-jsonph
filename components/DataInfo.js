import css from './DataInfo.module.css';
import ShowPostsBtn from './ShowPostsBtn';

export default function DataInfo({ user, onClick }) {
  const {
    id,
    name: fName,
    username,
    email,
    address: {
      street,
      suite,
      city,
      zipcode,
      geo: { lat, lng },
    },
    phone,
    website,
    company: { name: cName, catchPhrase, bs },
  } = user;

  return (
    <fieldset className={css.flexField}>
      <div className={css.infoUserContainer}>
        <h2>{`User №${id}`}</h2>
        <div>{`Name: ${fName}`}</div>
        <div>{`Username: ${username}`}</div>
        <div>{`Email: ${email}`}</div>
        <div>{`Address: ${street}, ${suite}, ${city}, ${zipcode}`}</div>
        <div>{`lat/lng: ${lat}/${lng}`}</div>
        <div>{`Phone: ${phone}`}</div>
        <div>{`Website: ${website}`}</div>
        <div>{`Company: ${cName}, ${catchPhrase}, ${bs}`}</div>
      </div>
      <ShowPostsBtn text="Show posts" onClick={onClick} />
    </fieldset>
  );
}