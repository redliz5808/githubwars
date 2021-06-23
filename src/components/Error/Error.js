const Error = () => {
  return (
    <div className="note error">
      I'm sorry, but the user you searched for does not exist or has caused an error. <br />{" "}
      Please enter the username of a user you are trying to look up. <br />{" "}
      Remember: This cannot be an organization.
    </div>
  );
};

export default Error;
