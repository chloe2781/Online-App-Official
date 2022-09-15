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
                <h1 className="title text-center flex-grow"><b>PHIẾU ĐĂNG KÝ DỰ TUYỂN</b></h1>
              <img id="thumbnail" src={(imageData) ? imageData : picture2} alt="Agribank" />
            </div>
            <br/>

            {/* Overview */}
            <div className="flex flex-col">
              <div className="flex row my-3">
                <label><b> VỊ TRÍ DỰ TUYỂN </b></label>
                <Field className="border flex-1 mx-3 input" type="text" name="position"/>
                <div className="flex">
                  <input type="file" onChange={onChangePicture} />
                </div>
              </div>
              <div className="flex flex-row my-3">
                <div className="flex-1 flex flex-row">
                  <label><b> Mã vị trí dự tuyển</b></label>
                  <Field className="border flex-1 mx-3 input" type="text" name="jobPositionCode" />
                </div>
                <div className="flex-1 flex flex-row">
                  <label><b> CN/Đơn vị </b></label>
                  <Field className="border flex-1 mx-3 input" type="text" name="unit" placeholder="" />
                </div>
                <div className="flex-1 flex flex-row">
                  <label><b> Khu vực </b></label>
                  <Field className="border flex-1 mx-3 input" type="text" name="area" placeholder="" />
                </div>
              </div>
            </div>
            <p className="highlight-div my-10"><b>
              1 THÔNG TIN CÁ NHÂN </b><br />
            </p>

            <div className="flex flex-col">
              {/* Personal Information */}
              <div className="flex flex-row my-3 justify-between">
                <div className="flex flex-col">
                  <label> Họ, đệm và tên </label>
                  <Field className="border flex-1 input" type="text" name="fullName" placeholder="Lê Thị A" />
                </div>
                <div className="flex flex-col">
                  <label> Ngày sinh </label>
                  <Field className="border flex-1 input" type="date" name="dateOfBirth" />
                </div>
                <div className="flex flex-col mx-3">
                  <label> Giới tính </label>
                  <span className="space-x-2">
                    <Field type="radio" value="male" name="sex" /><label> Nam </label>
                    <Field type="radio" value="female" name="sex" /><label> Nữ </label>
                  </span>
                </div>
                <div className="flex flex-col">
                  <label> Chiều cao (cm) </label>
                  <Field className="border flex-1 input" type="text" name="height" placeholder="157" />
                </div>
                <div className="flex flex-col">
                  <label> Cân nặng (kg) </label>
                  <Field className="border flex-1 input" type="text" name="weight" placeholder="50" />
                </div>
              </div>
              {/* Permanent Address, province, city */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col ">
                  <label> Địa chỉ thường chú (số phòng/nhà - ngõ/phố - thôn/xóm - phường/xã) </label>
                  <Field className="border flex-1 input" type="text" name="permanentAddress.address" placeholder="Phòng 810, 194 Giải Phóng, Phương Liệt" />
                </div>
                <div className="flex flex-col">
                  <label> Quận/Huyện </label>
                  <Field className="border flex-1 input" type="text" name="permanentAddress.district" placeholder="Thanh Xuân" />
                </div>
                <div className="flex flex-col">
                  <label> Tỉnh/Thành phố </label>
                  <Field className="border flex-1 input" type="text" name="permanentAddress.city" placeholder="Hà Nội" />
                </div>
              </div>
              {/* Temporary Address, province, city */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> Nơi ở hiện nay (số phòng/nhà - ngõ/phố - thôn/xóm - phường/xã) </label>
                  <Field className="border flex-1 input" type="text" name="currentAddress.address" placeholder="Phòng 810, 194 Giải Phóng, Phương Liệt" />
                </div>
                <div className="flex flex-col">
                  <label> Quận/Huyện </label>
                  <Field className="border flex-1 input" type="text" name="currentAddress.district" placeholder="Thanh Xuân" />
                </div>
                <div className="flex flex-col">
                  <label> Tỉnh/Thành phố </label>
                  <Field className="border flex-1 input" type="text" name="currentAddress.city" placeholder="Hà Nội" />
                </div>
              </div>
              {/* Passport, racial and marital information */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> Số CMND/Hộ chiếu </label>
                  <Field className="border flex-1 input" type="text" name="idPassportNumber" />
                </div>
                <div className="flex flex-col">
                  <label> Nơi cấp </label>
                  <Field className="border flex-1 input" type="text" name="issuedBy" placeholder="TP. Hồ Chí Minh" />
                </div>
                <div className="flex flex-col">
                  <label> Ngày cấp </label>
                  <Field className="border flex-1 input" type="date" name="issuedDate" />
                </div>
                <div className="flex flex-col">
                  <label> Dân tộc </label>
                  <Field className="border flex-1 input" type="text" name="ethnic" placeholder="Kinh" />
                </div>
                <div className="flex flex-col">
                  <label> Tình trạng hôn nhân </label>
                  <Field className="border flex-1 input" type="text" name="maritalStatus" placeholder="Đã cưới" />
                </div>
              </div>
              {/* Contact information */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> Số ĐT di động </label>
                  <Field className="border flex-1 input" type="text" name="mobileNumber" />
                </div>
                <div className="flex flex-col">
                  <label> Số ĐT cố định </label>
                  <Field className="border flex-1 input" type="text" name="permanentNumber" />
                </div>
                <div className="flex flex-col">
                  <label> Email </label>
                  <Field className="border flex-1 input" type="text" name="emailAddress" />
                </div>
                <div className="flex flex-col">
                  <label> Thông tin liên lạc khác (Zalo,...) </label>
                  <Field className="border flex-1 input" type="text" name="otherContact" />
                </div>
              </div>
              {/* Emergency contact and start date */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label> Người liên hệ khẩn cấp </label>
                  <Field className="border flex-1 input" type="text" name="emergencyContact"  placeholder="Nguyễn Văn B" />
                </div>
                <div className="flex flex-col">
                  <label> Số ĐT di động </label>
                  <Field className="border flex-1 input" type="tel" name="emergencyNumber"/>
                </div>
                <div className="flex flex-col">
                  <label> Mối quan hệ </label>
                  <Field className="border flex-1 input" type="text" name="emergencyRelationship"  placeholder="Anh/em" />
                </div>
                <div className="flex flex-col">
                  <label> Ngày có thể bắt dầu đi làm </label>
                  <Field className="border flex-1 input" type="date" name="startDate" />
                </div>
              </div>
            </div>

            {/* Education Information */}
            <p className="highlight-div my-10"><b>
              2 QUÁ TRÌNH ĐÀO TẠO </b>
            </p>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label> Trình độ </label>
                <Field className="border flex-1 input" type="text" name="uni1.level" placeholder="Đại học"/>
              </div>
              <div className="flex flex-col">
                <label> Tên trường đào tạo </label>
                <Field className="border flex-1 input" type="text" name="uni1.name" placeholder="Đại Học Ngoại Thương"/>
              </div>
              <div className="flex flex-col">
                <label> Chuyên ngành </label>
                <Field className="border flex-1 input" type="text" name="uni1.major" placeholder="Công Nghệ Thông Tin"/>
              </div>
              <div className="flex flex-col">
                <label> Từ </label>
                <Field className="border flex-1 input" type="month" name="uni1.start" placeholder="10/2018"/>
              </div>
              <div className="flex flex-col">
                <label> Đến </label>
                <Field className="border flex-1 input" type="month" name="uni1.end" placeholder="06/2022"/>
              </div>
              <div className="flex flex-col">
                <label> Hình thức đào tạo </label>
                <Field className="border flex-1 input" type="text" name="uni1.training"/>
              </div>
              <div className="flex flex-col">
                <label> Xếp loại </label>
                <Field className="border flex-1 input" type="text" name="uni1.category" placeholder="Giỏi"/>
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
                <label> Ngoại ngữ </label>
                <label> Tiếng Anh </label>
              </div>
              <div className="flex flex-col flex-shrink">
                <label> Nghe </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.listening" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                <label> Nói </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.speaking" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                <label> Đọc </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.reading" placeholder="" />
              </div>
              <div className="flex flex-col flex-shrink">
                <label> Viết </label>
                <Field className="border flex-1 input" type="text" name="englishProficiency.writing" placeholder="" />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex-1 flex flex-row">
                <label> Ngôn ngữ khác: </label>
                <Field className="border flex-1 input mb-0 self-end" type="text" name="otherLanguageProficiency.language" placeholder="Tây Ban Nha" />
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
                <label> Chứng chỉ Tiếng Anh </label>
              </div>
              <div className="flex flex-col">
                <label> Loại chứng chỉ </label>
                <Field className="border flex-1 input" type="text" name="englishCert.type"/>
              </div>
              <div className="flex flex-col">
                <label> Điểm/Xếp loại </label>
                <Field className="border flex-1 input" type="text" name="englishCert.score"/>
              </div>
              <div className="flex flex-col">
                <label> Đơn vị cấp chứng chỉ </label>
                <Field className="border flex-1 input" type="text" name="englishCert.issuer"/>
              </div>
              <div className="flex flex-col">
                <label> Ngày cấp </label>
                <Field className="border flex-1 input" type="date" name="englishCert.date"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label> Chứng chỉ Tin Học </label>
              </div>
              <div className="flex flex-col">
                <label> Loại chứng chỉ </label>
                <Field className="border flex-1 input" type="text" name="otherCert.type"/>
              </div>
              <div className="flex flex-col">
                <label> Đơn vị cấp chứng chỉ </label>
                <Field className="border flex-1 input" type="text" name="otherCert.issuer"/>
              </div>
              <div className="flex flex-col">
                <label> Ngày cấp </label>
                <Field className="border flex-1 input" type="date" name="otherCert.date"/>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex-1 flex flex-row">
                <label> Kỹ năng </label>
                <Field className="border flex-1 input" type="text" name="skills"/>
              </div>
            </div>

            {/* Work Experience */}
            <p className="highlight-div my-10">
              <b> 3 QUÁ TRÌNH CÔNG TÁC </b>(Xin liệt kê công việc theo thứ tự từ gần nhât đến xa nhất)
            </p>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col flex-1">
                <label> Từ </label>
                <Field className="border flex-1 input" type="month" name="workExp1.from" />
              </div>
              <div className="flex flex-col flex-1">
                <label> Đến </label>
                <Field className="border flex-1 input" type="month" name="workExp1.to"/>
              </div>
              <div className="flex flex-col flex-1">
                <label> Tên đơn vị công tác </label>
                <Field className="border flex-1 input" type="text" name="workExp1.company" placeholder="Agribank Nam Hà Nội"/>
              </div>
              <div className="flex flex-col flex-1">
                <label> Vị trí/Chức vụ </label>
                <Field className="border flex-1 input" type="text" name="workExp1.position" placeholder="Thực tập sinh"/>
              </div>
              <div className="flex flex-col flex-[2]">
                <label> Nhiệm vụ và thành tích công tác </label>
                <Field className="border flex-1 input" type="text" name="workExp1.description" placeholder="Lấy kinh nghiệm"/>
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
              <label className="text-center"> Khen thưởng </label>
                <hr className="my-5 h-[2px] bg-slate-500"/>
                <div className="flex flex-row">
                  <div className="flex flex-col flex-1">
                    <label> Danh hiệu</label>
                    <Field className="border flex-1 input" type="text" name="reward"/>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label>Thời gian </label>
                    <Field className="border flex-1 input" type="date" name="rewardDate"/>
                  </div>
                </div>
              </div>
              <div className="flex-[.1]"></div>
              <div className="flex-1 flex flex-col">
                <label className="text-center"> Kỷ luật </label>
                <hr className="my-5 h-[2px] bg-slate-500"/>
                <div className="flex flex-row">
                  <div className="flex flex-col flex-1">
                    <label> Kỷ luật</label>
                    <Field className="border flex-1 input" type="text" name="punishment"/>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label>Thời gian </label>
                    <Field className="border flex-1 input" type="date" name="punishmentDate"/>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-10 h-[2px] bg-slate-500"/>

            <label className="my-10">Tôi xin cam đoan những thông tin cung cấp trên đây là chính xác và đầy đủ.
              Tôi chấp nhận việc điều tra, thẩm tra 
              những thông tin về cá nhân trong quá trình ra quyết định tuyển dụng và
               cam kết hợp tác trong quá trình thẩm tra.</label>

            <div className="flex flex-row justify-between space-x-[10rem]">
              <span className="flex-1 flex flex-row items-center">
                <label> Ngày </label>
                <Field className="border flex-1 input w-full" type="date" name="submissionDate"/>
              </span>
              <span className="flex-1 flex flex-row items-center">
                <label> Chữ ký (ghi họ và tên) </label>
                <Field className="border flex-1 input w-full" type="text" name="signature"/>
              </span>
            </div>

            <button type="submit" className="w-fit self-center submit mt-15">
              NỘP ĐƠN
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  </>
    )
  }

    export default ApplicationForm;