import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttontext, to }) => {
  return (
    <div className='py-2 text-sm flex justify-center'>
      <div>{label}</div>
      <Link to={to} className='pointer underline pl-1 cursor-pointer'>
        {buttontext}
      </Link>
    </div>
  );
};

export default BottomWarning;