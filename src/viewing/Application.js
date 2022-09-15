import { Link, useParams, Navigate } from "react-router-dom";
import { doc, getDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
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

function Application() {
  const { applicationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const [toApplications, setToApplications] = useState(false);
  const [applicationImage, setApplicationImage] = useState(null);
  useEffect(() => {
    async function getApplication() {
      const db = getFirestore(app);
      const docRef = doc(db, "applications", applicationId);
      const application = (await getDoc(docRef)).data();
      console.log(application);
      setApplication(application.values);
      setApplicationImage(application.imageData);
      setLoading(false);
    }
    getApplication();
  }, [applicationId]);

  function deleteApplication() {
    console.log("delete application");
    const db = getFirestore(app);
    deleteDoc(doc(db, "applications", applicationId))
      .then(() => {
        console.log("Document successfully deleted!");
        setToApplications(true);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  if (loading) {
    return <div>Vui lòng chờ... </div>;
  }

  if (toApplications) {
    return <Navigate to="/applications" />;
  }

  return (
    <div className="flex flex-col w-5/6 p-10 m-auto">
      {/*display each value of application except fullname as a list item*/}
      <div className="flex flex-row flex-grow">
        <img src={agribankicon} alt="Agribank" />
        <h1 className="title text-center flex-grow">
          <b>{application.fullName}</b>
        </h1>
        {applicationImage !== null ? (
          <img src={applicationImage} alt="Hình ảnh kèm theo" />
        ) : (
          <p>Hình ảnh không được cung cấp</p>
        )}
      </div>
      <br />

      {/* Overview */}
      <div className="flex flex-col">
        <div className="flex flex-row my-3">
          <label>
            <b> VỊ TRÍ DỰ TUYỂN </b>
          </label>
          <div className="border flex-1 mx-3 input">
            {application["position"]}
          </div>
        </div>
        <div className="flex flex-row my-3">
          <div className="flex-1 flex flex-row">
            <label>
              <b> Mã vị trí dự tuyển</b>
            </label>
            <div className="border flex-1 mx-3 input">
              {application["jobPositionCode"]}
            </div>
          </div>
          <div className="flex-1 flex flex-row">
            <label>
              <b> CN/Đơn vị </b>
            </label>
            <div className="border flex-1 mx-3 input">
              {application["unit"]}
            </div>
          </div>
          <div className="flex-1 flex flex-row">
            <label>
              <b> Khu vực </b>
            </label>
            <div className="border flex-1 mx-3 input">
              {application["area"]}
            </div>
          </div>
        </div>
      </div>
      <p className="highlight-div my-10">
        <b>1 THÔNG TIN CÁ NHÂN </b>
        <br />
      </p>

      <div className="flex flex-col">
        {/* Personal Information */}
        <div className="flex flex-row my-3 justify-between">
          <div className="flex flex-col flex-grow">
            <label> Họ, đệm và tên </label>
            <div className="border flex-1 mx-3 input">
              {application["fullName"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Ngày sinh </label>
            <div className="border flex-1 input">
              {application["dateOfBirth"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow mx-3">
            <label> Giới tính </label>
            <span className="space-x-2">
              <div className="border flex-1 mx-3 input">
                {application["sex"]}
              </div>
            </span>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Chiều cao (cm) </label>
            <div className="border flex-1 input">{application["height"]}</div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Cân nặng (kg) </label>
            <div className="border flex-1 input">{application["weight"]}</div>
          </div>
        </div>
        {/* Permanent Address, province, city */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-1/2">
            <label>
              Địa chỉ thường chú (số phòng/nhà - ngõ/phố - thôn/xóm - phường/xã)
            </label>
            <div className="border flex-1 input">
              {application["permanentAddress"].address}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Quận/Huyện </label>
            <div className="border flex-1 input">
              {application["permanentAddress"].district}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Tỉnh/Thành phố </label>
            <div className="border flex-1 input">
              {application["permanentAddress"].city}
            </div>
          </div>
        </div>
        {/* Temporary Address, province, city */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-1/2">
            <label>
              Nơi ở hiện nay (số phòng/nhà - ngõ/phố - thôn/xóm - phường/xã)
            </label>
            <div className="border flex-1 input">
              {application["currentAddress"].address}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Quận/Huyện </label>
            <div className="border flex-1 input">
              {application["currentAddress"].district}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Tỉnh/Thành phố </label>
            <div className="border flex-1 input">
              {application["currentAddress"].city}
            </div>
          </div>
        </div>
        {/* Passport, racial and marital information */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col flex-grow">
            <label> Số CMND/Hộ chiếu </label>
            <div className="border flex-1 input">
              {application["idPassportNumber"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Nơi cấp </label>
            <div className="border flex-1 input">{application["issuedBy"]}</div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Ngày cấp </label>
            <div className="border flex-1 input">
              {application["issuedDate"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Dân tộc </label>
            <div className="border flex-1 input">{application["ethnic"]}</div>
          </div>
          <div className="flex flex-col">
            <label> Tình trạng hôn nhân </label>
            <div className="border flex-1 input">
              {application["maritalStatus"]}
            </div>
          </div>
        </div>
        {/* Contact information */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col flex-grow">
            <label> Số ĐT di động </label>
            <div className="border flex-1 input">
              {application["mobileNumber"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Số ĐT cố định </label>
            <div className="border flex-1 input">
              {application["permanentNumber"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Email </label>
            <div className="border flex-1 input">
              {application["emailAddress"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Thông tin liên lạc khác (Zalo,...) </label>
            <div className="border flex-1 input">
              {application["otherContact"]}
            </div>
          </div>
        </div>
        {/* Emergency contact and start date */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col flex-grow">
            <label> Người liên hệ khẩn cấp </label>
            <div className="border flex-1 input">
              {application["emergencyContact"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Số ĐT di động </label>
            <div className="border flex-1 input">
              {application["emergencyNumber"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Mối quan hệ </label>
            <div className="border flex-1 input">
              {application["emergencyRelationship"]}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label> Ngày có thể bắt dầu đi làm </label>
            <div className="border flex-1 input">
              {application["startDate"]}
            </div>
          </div>
        </div>
      </div>

      {/* Education Information */}
      <p className="highlight-div my-10">
        <b>2 QUÁ TRÌNH ĐÀO TẠO </b>
      </p>

      <div className="flex flex-row justify-between">
        <div className="flex-col w-[16.67%]">
          <label> Trình độ </label>
          <div className="border flex-1 input">{application["uni1"].level}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <label> Tên trường đào tạo </label>
          <div className="border flex-1 input">{application["uni1"].name}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <label> Chuyên ngành </label>
          <div className="border flex-1 input">{application["uni1"].major}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <label> Từ </label>
          <div className="border flex-1 input">{application["uni1"].start}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <label> Đến </label>
          <div className="border flex-1 input">{application["uni1"].end}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <label> Hình thức đào tạo </label>
          <div className="border flex-1 input">
            {application["uni1"].training}
          </div>
        </div>
        <div className="flex-col w-[16.67%]">
          <label> Xếp loại </label>
          <div className="border flex-1 input">
            {application["uni1"].category}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni2"].level}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni2"].name}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni2"].major}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni2"].start}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni2"].end}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">
            {application["uni2"].training}
          </div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">
            {application["uni2"].category}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni3"].level}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni3"].name}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni3"].major}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni3"].start}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">{application["uni3"].end}</div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">
            {application["uni3"].training}
          </div>
        </div>
        <div className="flex-col w-[16.67%]">
          <div className="border flex-1 input">
            {application["uni3"].category}
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-10">
        <div className="w-[92px] mx-10 flex flex-col justify-between">
          <p className="flex-grow text-lg font-serif"> Ngoại ngữ </p>
          <p className="flex-grow text-lg font-serif"> Tiếng Anh </p>
        </div>
        <div className="flex flex-col flex-grow">
          <label> Nghe </label>
          <div className="border flex-1 input">
            {application["englishProficiency"].listening}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <label> Nói </label>
          <div className="border flex-1 input">
            {application["englishProficiency"].speaking}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <label> Đọc </label>
          <div className="border flex-1 input">
            {application["englishProficiency"].reading}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <label> Viết </label>
          <div className="border flex-1 input">
            {application["englishProficiency"].writing}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-[137px] mx-4">
          <label> Ngôn ngữ khác: </label>
        </div>
        <div className="border flex-1 input">
          {application["otherLanguageProficiency"].language}
        </div>
        <div className="border flex-1 input">
          {application["otherLanguageProficiency"].listening}
        </div>
        <div className="border flex-1 input">
          {application["otherLanguageProficiency"].speaking}
        </div>
        <div className="border flex-1 input">
          {application["otherLanguageProficiency"].reading}
        </div>
        <div className="border flex-1 input">
          {application["otherLanguageProficiency"].writing}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[169px]">
          <label> Chứng chỉ Tiếng Anh </label>
        </div>
        <div className="flex-grow">
          <label> Loại chứng chỉ </label>
          <div className="border flex-1 input">
            {application["englishCert"].type}
          </div>
        </div>
        <div className="flex-grow">
          <label> Điểm/Xếp loại </label>
          <div className="border flex-1 input">
            {application["englishCert"].score}
          </div>
        </div>
        <div className="flex-grow">
          <label> Đơn vị cấp chứng chỉ </label>
          <div className="border flex-1 input">
            {application["englishCert"].issuer}
          </div>
        </div>
        <div className="flex-grow">
          <label> Ngày cấp </label>
          <div className="border flex-1 input">
            {application["englishCert"].date}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[169px]">
          <label> Chứng chỉ Tin Học </label>
        </div>
        <div className="flex-grow">
          <label> Loại chứng chỉ </label>
          <div className="border flex-1 input">
            {application["otherCert"].type}
          </div>
        </div>
        <div className="flex-grow">
          <label> Đơn vị cấp chứng chỉ </label>
          <div className="border flex-1 input">
            {application["otherCert"].issuer}
          </div>
        </div>
        <div className="flex-grow">
          <label> Ngày cấp </label>
          <div className="border flex-1 input">
            {application["otherCert"].date}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1 flex flex-row">
          <div className="w-[169px]">
            <label> Kỹ năng </label>
          </div>
          <div className="border flex-1 input">{application["skills"]}</div>
        </div>
      </div>

      {/* Work Experience */}
      <p className="highlight-div my-10">
        <b> 3 QUÁ TRÌNH CÔNG TÁC </b>
      </p>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col flex-1">
          <label> Từ </label>
          <div className="border input">{application["workExp1"].from}</div>
        </div>
        <div className="flex flex-col flex-1">
          <label> Đến </label>
          <div className="border input">{application["workExp1"].to}</div>
        </div>
        <div className="flex flex-col flex-1">
          <label> Tên đơn vị công tác </label>
          <div className="border input">{application["workExp1"].company}</div>
        </div>
        <div className="flex flex-col flex-1">
          <label> Vị trí/Chức vụ </label>
          <div className="border input">{application["workExp1"].position}</div>
        </div>
        <div className="flex flex-col flex-[2]">
          <label> Nhiệm vụ và thành tích công tác </label>
          <div className="border input">
            {application["workExp1"].description}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <div className="border input">{application["workExp2"].from}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp2"].to}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp2"].company}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp2"].position}</div>
        </div>
        <div className="flex flex-col flex-[2]">
          <div className="border input">
            {application["workExp2"].description}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <div className="border input">{application["workExp3"].from}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp3"].to}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp3"].company}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp3"].position}</div>
        </div>
        <div className="flex flex-[2]">
          <div className="border input">
            {application["workExp3"].description}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <div className="border input">{application["workExp4"].from}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp4"].to}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp4"].company}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp4"].position}</div>
        </div>
        <div className="flex-[2]">
          <div className="border input">
            {application["workExp4"].description}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <div className="border input">{application["workExp5"].from}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp5"].to}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp5"].company}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp5"].position}</div>
        </div>
        <div className="flex-[2]">
          <div className="border input">
            {application["workExp5"].description}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <div className="border input">{application["workExp6"].from}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp6"].to}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp6"].company}</div>
        </div>
        <div className="flex-1">
          <div className="border input">{application["workExp6"].position}</div>
        </div>
        <div className="flex-[2]">
          <div className="border input">
            {application["workExp6"].description}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between space-x-5 mt-5">
        <div className="flex-1 flex flex-col">
          <label className="text-center"> Khen thưởng </label>
          <hr className="my-5 h-[2px] bg-slate-500" />
          <div className="flex flex-row">
            <div className="flex flex-col flex-1">
              <label> Danh hiệu</label>
              <div className="border input">{application["reward"]}</div>
            </div>
            <div className="flex flex-col flex-1">
              <label>Thời gian </label>
              <div className="border input">{application["rewardDate"]}</div>
            </div>
          </div>
        </div>
        <div className="flex-[.1]"></div>
        <div className="flex-1 flex flex-col">
          <label className="text-center"> Kỷ luật </label>
          <hr className="my-5 h-[2px] bg-slate-500" />
          <div className="flex flex-row">
            <div className="flex flex-col flex-1">
              <label> Kỷ luật</label>
              <div className="border input">{application["punishment"]}</div>
            </div>
            <div className="flex flex-col flex-1">
              <label>Thời gian </label>
              <div className="border input">
                {application["punishmentDate"]}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10 h-[2px] bg-slate-500" />

      <label className="my-10">
        Tôi xin cam đoan những thông tin cung cấp trên đây là chính xác và đầy
        đủ. Tôi chấp nhận việc điều tra, thẩm tra những thông tin về cá nhân
        trong quá trình ra quyết định tuyển dụng và cam kết hợp tác trong quá
        trình thẩm tra.
      </label>

      <div className="flex flex-row justify-between space-x-[10rem]">
        <span className="flex-1 flex flex-row items-center">
          <label> Ngày </label>
          <div className="border flex-1 input w-full">
            {application["submissionDate"]}
          </div>
        </span>
        <span className="flex-1 flex flex-row items-center">
          <label> Chữ ký (ghi họ và tên) </label>
          <div className="border flex-1 input w-full">
            {application["signature"]}
          </div>
        </span>
      </div>
      {/* Back and discard buttons */}
      <div className="flex flex-row justify-around m-10">
        <button className="submit" onClick={deleteApplication}>
          Xóa bỏ
        </button>
        <button className="submit">
          <Link to="/applications">Hủy</Link>
        </button>
      </div>
    </div>
  );
}

export default Application;
