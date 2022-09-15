import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import agribankicon from "../images/Icon-Agribank.png";

const firebaseConfig = {
  apiKey: "AIzaSyCAeZh6A6xGwGo8FmN8bFINU58746htMxA",
  authDomain: "chloeonline-303d2.firebaseapp.com",
  projectId: "chloeonline-303d2",
  storageBucket: "chloeonline-303d2.appspot.com",
  messagingSenderId: "550459720046",
  appId: "1:550459720046:web:d1e923b3d2a1b64baa817f",
  measurementId: "G-ND580FP08W",
};

// Initialize Firebase right before we use it as a one off operation like a chad
const app = initializeApp(firebaseConfig);

function Applications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore(app);

    async function fetchApplications() {
      //create a list of key/value pairs fullname/id from the applications collection
      const applicationsSnapshot = await getDocs(
        collection(db, "applications")
      );
      //map each application to a key value pairing of fullname and id
      console.log(applicationsSnapshot.docs[0].get("fullName"));
      const applications = applicationsSnapshot.docs
        .map((doc) => {
          return {
            id: doc.id,
            fullName: doc.get("values.fullName"),
          };
        })
        .filter((application) => {
          return application.fullName !== undefined;
        });
      setApplications(applications);
      console.log(applications);
      setIsLoading(false);
    }
    fetchApplications();
  }, []);

  if (isLoading) {
    return <div>Vui lòng chờ...</div>;
  }

  return (
    <div className="flex flex-col p-10 w-5/6 m-auto item">
      <div className="flex flex-row">
        <img src={agribankicon} alt="Agribank" />
        <h1 className="title text-center flex-grow">
          <b>DANH SÁCH ỨNG DỤNG</b>
        </h1>
        <img src={agribankicon} alt="Agribank" />
        <div>&nbsp;</div>
      </div>
      <hr className="my-5 h-[2px] bg-gray-300" />

      <ul className="rounded-md ">
        {applications.map((application) => (
          <div className="py-3" key={application.id}>
            <Link to={`/applications/${application.id}`}>
              <div className="highlight-div w-full rounded-md">
                <p className="text-2xl text-white">{application.fullName + " "}&nbsp;</p>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Applications;
