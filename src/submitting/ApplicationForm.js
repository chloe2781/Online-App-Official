import agribankicon from "../images/Icon-Agribank.png";
import picture2 from "../images/picture2.png";
import { Field, Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCAeZh6A6xGwGo8FmN8bFINU58746htMxA",
  authDomain: "chloeonline-303d2.firebaseapp.com",
  projectId: "chloeonline-303d2",
  storageBucket: "chloeonline-303d2.appspot.com",
  messagingSenderId: "550459720046",
  appId: "1:550459720046:web:d1e923b3d2a1b64baa817f",
  measurementId: "G-ND580FP08W"
};

// Initialize Firebase right before we use it as a on off operation like a chad
const app = initializeApp(firebaseConfig);

function ApplicationForm () {
    const navigate = useNavigate();

    const [imageData, setImgData] = useState(null);
    // Initialize Firebase
    const db = getFirestore(app);

    const onChangePicture = e => {
      if (e.target.files[0]) {
        console.log("picture: ", e.target.files);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    return(
    <>
    {/* Master Container */}
    <div className="flex justify-center w-full h-full">
      <div className="w-5/6 flex flex-col">
        <Formik
          initialValues={{
            position: "",
            jobPositionCode: "",
            unit: "",
            area: "",
            fullName: "",
            dateOfBirth: "",
            sex: "",
            height: "",
            weight: "",
            permanentAddress: {
              address: "",
              district: "",
              city: "",
            },
            currentAddress: {
              address: "",
              district: "",
              city: "",
            },
            idPassportNumber: "",
            issuedBy: "",
            issuedDate: "",
            ethnic: "",
            maritalStatus: "",
            mobileNumber: "",
            permanentNumber: "",
            emailAddress: "",
            otherContact: "",
            emergencyContact: "",
            emergencyNumber: "",
            emergencyRelationship: "",
            startDate: "",
            uni1: {
              level: "",
              name: "",
              major: "",
              start: "",
              end: "",
              training: "",
              category: "",
            },
            uni2: {
              level: "",
              name: "",
              major: "",
              start: "",
              end: "",
              training: "",
              category: "",

            },
            uni3: {
              level: "",
              name: "",
              major: "",
              start: "",
              end: "",
              training: "",
              category: "",

            },
            englishProficiency: {
              listening: "",
              speaking: "",
              reading: "",
              writing: "",
            },
            otherLanguageProficiency: {
              language: "",
              listening: "",
              speaking: "",
              reading: "",
              writing: "",
            },
            englishCert: {
              type: "",
              score: "",
              issuer: "",
              date: "",
            },
            otherCert: {
              type: "",
              issuer: "",
              date: "",
            },
            skills: "",
            workExp1: {
              from: "",
              to: "",
              company: "",
              position: "",
              description: "",
            },
            workExp2: {
              from: "",
              to: "",
              company: "",
              position: "",
              description: "",
            },
            workExp3: {
              from: "",
              to: "",
              company: "",
              position: "",
              description: "",
            },
            workExp4: {
              from: "",
              to: "",
              company: "",
              position: "",
              description: "",
            },
            workExp5: {
              from: "",
              to: "",
              company: "",
              position: "",
              description: "",
            },
            workExp6: {
              from: "",
              to: "",
              company: "",
              position: "",
              description: "",
            },
            reward: "",
            rewardDate: "",
            punishment: "",
            punishmentDate: "",
            submissionDate: "",
            signature: "",

          }}
          onSubmit={async function (values) {
            await setDoc(doc(db, "applications", new Date().getTime().toString()), {
              values,
              imageData,
            }).then(() => {
              console.log(values);
              navigate("/success");
            });
          }
          }

        >
          <Form className="w-full flex flex-col page-setting">
            <div className="flex flex-row flex-grow">
              <img src={agribankicon} alt="Agribank" />
                <h1 className="title text-center flex-grow"><b>PHI???U ????NG K?? D??? TUY???N</b></h1>
              <img id="thumbnail" src={(imageData) ? imageData : picture2} alt="Agribank" />
            </div>
            <br/>

            {/* Overview */}
            <div className="flex flex-col">
              <div className="flex row my-3">
                <label><b> V??? TR?? D??? TUY???N </b></label>
                <Field className="border flex-1 mx-3 input" type="text" name="position"/>
                <div className="flex">
                  <input type="file" onChange={onChangePicture} />
                </div>
              </div>
              <div className="flex flex-row my-3">
                <div className="flex-1 flex flex-row">
                  <label><b> M?? v??? tr?? d??? tuy???n</b></label>
                  <Field className="border flex-1 mx-3 input" type="text" name="jobPositionCode" />
                </div>
                <div className="flex-1 flex flex-row">
                  <label><b> CN/????n v??? </b></label>
                  <Field className="border flex-1 mx-3 input" type="text" name="unit" placeholder="" />
                </div>
                <div className="flex-1 flex flex-row">
                  <label><b> Khu v???c </b></label>
                  <Field className="border flex-1 mx-3 input" type="text" name="area" placeholder="" />
                </div>
              </div>
            </div>
            <p className="highlight-div my-10"><b>
              1 TH??NG TIN C?? NH??N </b><br />
            </p>

            <div className="flex flex-col">
              {/* Personal Information */}
              <div className="flex flex-row my-3 justify-between">
                <div className="flex flex-col">
                  <label> H???, ?????m v?? t??n </label>
                  <Field className="border flex-1 input" type="text" name="fullName" placeholder="L?? Th??? A" />
                </div>
                <div className="flex flex-col">
                  <label> Ng??y sinh </label>
                  <Field className="border flex-1 input" type="date" name="dateOfBirth" />
                </div>
                <div className="flex flex-col mx-3">
                  <label> Gi???i t??nh </label>
                  <span className="space-x-2">
                    <Field type="radio" value="male" name="sex" /><label> Nam </label>
                    <Field type="radio" value="female" name="sex" /><label> N??? </label>
                  </span>
                </div>
                <div className="flex flex-col">
                  <label> Chi???u cao (cm) </label>
                  <Field className="border flex-1 input" type="text" name="height" placeholder="157" />
                </div>
                <div className="flex flex-col">
                  <label> C??n n???ng (kg) </label>
                  <Field className="border flex-1 input" type="text" name="weight" placeholder="50" />
                </div>
              </div>
              {/* Permanent Address, province, city */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col ">
                  <label> ?????a ch??? th?????ng ch?? (s??? ph??ng/nh?? - ng??/ph??? - th??n/x??m - ph?????ng/x??) </label>
                  <Field className="border flex-1 input" type="text" name="permanentAddress.address" placeholder="Ph??ng 810, 194 Gi???i Ph??ng, Ph????ng Li???t" />
                </div>
                <div className="flex flex-col">
                  <label> Qu???n/Huy???n </label>
                  <Field className="border flex-1 input" type="text" name="permanentAddress.district" placeholder="Thanh Xu??n" />
                </div>
                <div className="flex flex-col">
                  <label> T???nh/Th??nh ph??? </label>
                  <Field className="border flex-1 input" type="text" name="permanentAddress.city" placeholder="H?? N???i" />
                </div>
              </div>
              {/* Temporary Address, province, city */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> N??i ??? hi???n nay (s??? ph??ng/nh?? - ng??/ph??? - th??n/x??m - ph?????ng/x??) </label>
                  <Field className="border flex-1 input" type="text" name="currentAddress.address" placeholder="Ph??ng 810, 194 Gi???i Ph??ng, Ph????ng Li???t" />
                </div>
                <div className="flex flex-col">
                  <label> Qu???n/Huy???n </label>
                  <Field className="border flex-1 input" type="text" name="currentAddress.district" placeholder="Thanh Xu??n" />
                </div>
                <div className="flex flex-col">
                  <label> T???nh/Th??nh ph??? </label>
                  <Field className="border flex-1 input" type="text" name="currentAddress.city" placeholder="H?? N???i" />
                </div>
              </div>
              {/* Passport, racial and marital information */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> S??? CMND/H??? chi???u </label>
                  <Field className="border flex-1 input" type="text" name="idPassportNumber" />
                </div>
                <div className="flex flex-col">
                  <label> N??i c???p </label>
                  <Field className="border flex-1 input" type="text" name="issuedBy" placeholder="TP. H??? Ch?? Minh" />
                </div>
                <div className="flex flex-col">
                  <label> Ng??y c???p </label>
                  <Field className="border flex-1 input" type="date" name="issuedDate" />
                </div>
                <div className="flex flex-col">
                  <label> D??n t???c </label>
                  <Field className="border flex-1 input" type="text" name="ethnic" placeholder="Kinh" />
                </div>
                <div className="flex flex-col">
                  <label> T??nh tr???ng h??n nh??n </label>
                  <Field className="border flex-1 input" type="text" name="maritalStatus" placeholder="???? c?????i" />
                </div>
              </div>
              {/* Contact information */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> S??? ??T di ?????ng </label>
                  <Field className="border flex-1 input" type="text" name="mobileNumber" />
                </div>
                <div className="flex flex-col">
                  <label> S??? ??T c??? ?????nh </label>
                  <Field className="border flex-1 input" type="text" name="permanentNumber" />
                </div>
                <div className="flex flex-col">
                  <label> Email </label>
                  <Field className="border flex-1 input" type="text" name="emailAddress" />
                </div>
                <div className="flex flex-col">
                  <label> Th??ng tin li??n l???c kh??c (Zalo,...) </label>
                  <Field className="border flex-1 input" type="text" name="otherContact" />
                </div>
              </div>
              {/* Emergency contact and start date */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> Ng?????i li??n h??? kh???n c???p </label>
                  <Field className="border flex-1 input" type="text" name="emergencyContact"  placeholder="Nguy???n V??n B" />
                </div>
                <div className="flex flex-col">
                  <label> S??? ??T di ?????ng </label>
                  <Field className="border flex-1 input" type="tel" name="emergencyNumber"/>
                </div>
                <div className="flex flex-col">
                  <label> M???i quan h??? </label>
                  <Field className="border flex-1 input" type="text" name="emergencyRelationship"  placeholder="Anh/em" />
                </div>
                <div className="flex flex-col">
                  <label> Ng??y c?? th??? b???t d???u ??i l??m </label>
                  <Field className="border flex-1 input" type="date" name="startDate" />
                </div>
              </div>
            </div>

            {/* Education Information */}
            <p className="highlight-div my-10"><b>
              2 QU?? TR??NH ????O T???O </b>
            </p>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label> Tr??nh ????? </label>
                <Field className="border flex-1 input" type="text" name="uni1.level" placeholder="?????i h???c"/>
              </div>
              <div className="flex flex-col">
                <label> T??n tr?????ng ????o t???o </label>
                <Field className="border flex-1 input" type="text" name="uni1.name" placeholder="?????i H???c Ngo???i Th????ng"/>
              </div>
              <div className="flex flex-col">
                <label> Chuy??n ng??nh </label>
                <Field className="border flex-1 input" type="text" name="uni1.major" placeholder="C??ng Ngh??? Th??ng Tin"/>
              </div>
              <div className="flex flex-col">
                <label> T??? </label>
                <Field className="border flex-1 input" type="month" name="uni1.start" placeholder="10/2018"/>
              </div>
              <div className="flex flex-col">
                <label> ?????n </label>
                <Field className="border flex-1 input" type="month" name="uni1.end" placeholder="06/2022"/>
              </div>
              <div className="flex flex-col">
                <label> H??nh th???c ????o t???o </label>
                <Field className="border flex-1 input" type="text" name="uni1.training"/>
              </div>
              <div className="flex flex-col">
                <label> X???p lo???i </label>
                <Field className="border flex-1 input" type="text" name="uni1.category" placeholder="Gi???i"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni2.level" />
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni2.name"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni2.major"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="month" name="uni2.start"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="month" name="uni2.end"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni2.training"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni2.category"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni3.level" />
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni3.name"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni3.major"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="month" name="uni3.start"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="month" name="uni3.end"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni3.training"/>
              </div>
              <div className="flex flex-col">
                <Field className="border flex-1 input" type="text" name="uni3.category" />
              </div>
            </div>
            <div className="flex flex-row mt-10">
              <div className="flex-1 flex flex-col">
                <label> Ngo???i ng??? </label>
                <label> Ti???ng Anh </label>
              </div>
              <div className="flex flex-col flex-shrink">
                <label> Nghe </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.listening" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                <label> N??i </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.speaking" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                <label> ?????c </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.reading" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                <label> Vi???t </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.writing" placeholder="" />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex-1 flex flex-row">
                <label> Ng??n ng??? kh??c: </label>
                <Field className="border flex-1 input mb-0 self-end" type="text" name="otherLanguageProficiency.language" placeholder="T??y Ban Nha" />
              </div>
              <div className="flex flex-col flex-shrink">
                {/*<label> Nghe </label>*/}
                <Field className="border flex-1 input" type="text" name="otherLanguageProficiency.listening" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                {/*<label> Noi </label>*/}
                <Field className="border flex-1 input" type="text" name="otherLanguageProficiency.speaking" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                {/*<label> Doc </label>*/}
                <Field className="border flex-1 input" type="text" name="otherLanguageProficiency.reading" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                {/*<label> Viet </label>*/}
                <Field className="border flex-1 input" type="text" name="otherLanguageProficiency.writing" placeholder="" />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label> Ch???ng ch??? Ti???ng Anh </label>
              </div>
              <div className="flex flex-col">
                <label> Lo???i ch???ng ch??? </label>
                <Field className="border flex-1 input" type="text" name="englishCert.type"/>
              </div>
              <div className="flex flex-col">
                <label> ??i???m/X???p lo???i </label>
                <Field className="border flex-1 input" type="text" name="englishCert.score"/>
              </div>
              <div className="flex flex-col">
                <label> ????n v??? c???p ch???ng ch??? </label>
                <Field className="border flex-1 input" type="text" name="englishCert.issuer"/>
              </div>
              <div className="flex flex-col">
                <label> Ng??y c???p </label>
                <Field className="border flex-1 input" type="date" name="englishCert.date"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label> Ch???ng ch??? Tin H???c </label>
              </div>
              <div className="flex flex-col">
                <label> Lo???i ch???ng ch??? </label>
                <Field className="border flex-1 input" type="text" name="otherCert.type"/>
              </div>
              <div className="flex flex-col">
                <label> ????n v??? c???p ch???ng ch??? </label>
                <Field className="border flex-1 input" type="text" name="otherCert.issuer"/>
              </div>
              <div className="flex flex-col">
                <label> Ng??y c???p </label>
                <Field className="border flex-1 input" type="date" name="otherCert.date"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex-1 flex flex-row">
                <label> K??? n??ng </label>
                <Field className="border flex-1 input" type="text" name="skills"/>
              </div>
            </div>

            {/* Work Experience */}
            <p className="highlight-div my-10">
              <b> 3 QU?? TR??NH C??NG T??C </b>(Xin li???t k?? c??ng vi???c theo th??? t??? t??? g???n nh??t ?????n xa nh???t)
            </p>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <label> T??? </label>
                <Field className="border flex-1 input" type="month" name="workExp1.from" />
              </div>
              <div className="flex flex-col flex-1">
                <label> ?????n </label>
                <Field className="border flex-1 input" type="month" name="workExp1.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <label> T??n ????n v??? c??ng t??c </label>
                <Field className="border flex-1 input" type="text" name="workExp1.company" placeholder="Agribank Nam H?? N???i"/>
              </div>
              <div className="flex flex-col flex-1">
                <label> V??? tr??/Ch???c v??? </label>
                <Field className="border flex-1 input" type="text" name="workExp1.position" placeholder="Th???c t???p sinh"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <label> Nhi???m v??? v?? th??nh t??ch c??ng t??c </label>
                <Field className="border flex-1 input" type="text" name="workExp1.description" placeholder="L???y kinh nghi???m"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp2.from" />
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp2.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp2.company"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp2.position"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <Field className="border flex-1 input" type="text" name="workExp2.description"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp3.from" />
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp3.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp3.company"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp3.position"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <Field className="border flex-1 input" type="text" name="workExp3.description"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp4.from" />
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp4.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp4.company"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp4.position"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <Field className="border flex-1 input" type="text" name="workExp4.description"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp5.from" />
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp5.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp5.company"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp5.position"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <Field className="border flex-1 input" type="text" name="workExp5.description"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp6.from" />
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="month" name="workExp6.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp6.company"/>
              </div>
              <div className="flex flex-col flex-1">
                <Field className="border flex-1 input" type="text" name="workExp6.position"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <Field className="border flex-1 input" type="text" name="workExp6.description"/>
              </div>
            </div>

            <div className="flex flex-row justify-between space-x-5 mt-5"> 
              <div className="flex-1 flex flex-col">
              <label className="text-center"> Khen th?????ng </label>
                <hr className="my-5 h-[2px] bg-slate-500"/>
                <div className="flex flex-row">
                  <div className="flex flex-col flex-1">
                    <label> Danh hi???u</label>
                    <Field className="border flex-1 input" type="text" name="reward"/>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label>Th???i gian </label>
                    <Field className="border flex-1 input" type="date" name="rewardDate"/>
                  </div>
                </div>
              </div>
              <div className="flex-[.1]"></div>
              <div className="flex-1 flex flex-col">
                <label className="text-center"> K??? lu???t </label>
                <hr className="my-5 h-[2px] bg-slate-500"/>
                <div className="flex flex-row">
                  <div className="flex flex-col flex-1">
                    <label> K??? lu???t</label>
                    <Field className="border flex-1 input" type="text" name="punishment"/>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label>Th???i gian </label>
                    <Field className="border flex-1 input" type="date" name="punishmentDate"/>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-10 h-[2px] bg-slate-500"/>

            <label className="my-10">T??i xin cam ??oan nh???ng th??ng tin cung c???p tr??n ????y l?? ch??nh x??c v?? ?????y ?????.
              T??i ch???p nh???n vi???c ??i???u tra, th???m tra 
              nh???ng th??ng tin v??? c?? nh??n trong qu?? tr??nh ra quy???t ?????nh tuy???n d???ng v??
               cam k???t h???p t??c trong qu?? tr??nh th???m tra.</label>

            <div className="flex flex-row justify-between space-x-[10rem]">
              <span className="flex-1 flex flex-row items-center">
                <label> Ng??y </label>
                <Field className="border flex-1 input w-full" type="date" name="submissionDate"/>
              </span>
              <span className="flex-1 flex flex-row items-center">
                <label> Ch??? k?? (ghi h??? v?? t??n) </label>
                <Field className="border flex-1 input w-full" type="text" name="signature"/>
              </span>
            </div>

            <button type="submit" className="w-fit self-center submit mt-15">
              N???P ????N
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  </>
    )
  }

    export default ApplicationForm;