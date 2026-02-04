import RegistrationImage from "../assets/registration.jpg";

import RegistrtationForm from "../components/auth/RegistrtationForm";
const RegistrationPage = () => {
  return (
    <div>
      <div className="flex h-175 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <RegistrtationForm />
        </div>

        <div className="w-full hidden md:inline-block">
          <img
            className="h-full ml-10"
            src={RegistrationImage}
            alt="Registration Image"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
