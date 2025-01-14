import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBackClick} className="text-green-900 hover:underline">
      Back
    </button>
  );
}

export default BackButton;
