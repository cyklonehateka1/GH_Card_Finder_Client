import styled from "styled-components";
import arrow_down from "../../assets/arrow_down.svg";
import upload_icon1 from "../../assets/img_upload_icon_black.svg";
import upload_icon2 from "../../assets/img_upload_icon_green.svg";
import gh_flag from "../../assets/gh_flag_icon.svg";
import location_icon from "../../assets/location_icon.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "../../utils/axios";
import Cookies from "js-cookie";

interface SearchModalProps {
  modalOpen: (data: boolean) => void;
  onSubmit: (data: AddCardData) => void;
}

interface SubmitBtnProps {
  $completed: boolean;
}

interface DropdownProps {
  $active: boolean;
}

interface UploadButtonProps {
  $uploading: string;
}

export interface AddCardData {
  firstName: string;
  lastName: string;
  dob: string;
  type: string;
  idNumber: string;
  repoter_name: string;
  repoter_phone: string;
  repoter_address: string;
  locationOfDocument: string;
  profileImg: string;
  dateReported: string;
}

interface CloudinaryUploadResponse {
  secure_url: string;
}

const AddDocumentModal: React.FC<SearchModalProps> = ({
  modalOpen,
  onSubmit,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [formType, setFormType] = useState<string>("card");
  const [error, setError] = useState<string>("");
  const [complete, setComplete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState<AddCardData>({
    firstName: "",
    lastName: "",
    dob: "",
    type: "",
    idNumber: "",
    repoter_name: "",
    repoter_phone: "",
    repoter_address: "",
    locationOfDocument: "",
    profileImg: "",
    dateReported: "",
  });

  useEffect(() => {
    if (formType === "card") {
      if (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.dob.trim() !== "" &&
        formData.type.trim() !== "" &&
        formData.idNumber.trim() !== "" &&
        formData.profileImg.trim() !== ""
      ) {
        setComplete(true);
      } else {
        setComplete(false);
      }
    } else if (formType === "reporter") {
      if (
        formData.repoter_name.trim() !== "" &&
        formData.repoter_address.trim() !== "" &&
        formData.repoter_phone.trim() !== "" &&
        formData.locationOfDocument.trim() !== ""
      ) {
        setComplete(true);
      } else {
        setComplete(false);
      }
    }
  }, [formData, formType]);

  const handleDropdownMenuSelect = (value: string) => {
    setError("");
    setFormData({ ...formData, type: value });
    setDropdownActive(false);
  };

  const formChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const parentDiv = e.currentTarget as HTMLElement;
    if (!parentDiv.querySelector("div")?.contains(e.target as Node)) {
      modalOpen(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("upload_preset", "pjvkpghv"); // Replace with your upload preset

    try {
      const response: AxiosResponse<CloudinaryUploadResponse> =
        await axios.post(
          "https://api.cloudinary.com/v1_1/dvmgwofue/image/upload",
          imgData,
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!
              );
              setUploadProgress(progress); // Update progress state
            },
          }
        );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check if the file size exceeds 10MB
      if (file.size > 10 * 1024 * 1024) {
        // 10MB in bytes
        setError("The file size exceeds 10MB.");
        return;
      }

      // Proceed with the upload if size is acceptable
      setUploading(true);
      const url = await uploadImage(file);

      if (url) {
        setFormData({ ...formData, profileImg: url });
        setFileName(file.name);
      } else {
        setError("Failed to upload the image.");
      }
      setUploading(false);
    } else {
      setError("No file selected.");
    }
  };

  const processPhoneNumber = (phoneNumber: string): string | null => {
    if (phoneNumber.startsWith("0") && phoneNumber.length === 10) {
      return "233" + phoneNumber.slice(1); // Remove the leading 0 and add 233
    } else if (!phoneNumber.startsWith("0") && phoneNumber.length === 9) {
      return "233" + phoneNumber; // Add 233 directly if the number is 9 characters long
    } else {
      return null; // Invalid phone number
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Validate phone number
    const processedPhoneNumber = processPhoneNumber(formData.repoter_phone);
    if (!processedPhoneNumber) {
      setError(
        "Invalid phone number. Ensure it starts with '0' and is 10 digits long, or is 9 digits long without '0'."
      );
      return;
    }

    if (formType === "reporter") {
      if (
        formData.repoter_name.trim() === "" ||
        formData.repoter_address.trim() === "" ||
        processedPhoneNumber === null ||
        formData.locationOfDocument.trim() === ""
      ) {
        setError("All fields are required");
        return;
      }
    }

    // Group the data to be sent in the request body
    const requestBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      dateReported: formData.dateReported,
      type: formData.type,
      idNumber: formData.idNumber,
      profileImg: formData.profileImg,
      repoter_name: formData.repoter_name,
      repoter_phone: processedPhoneNumber, // Use the processed phone number here
      repoter_address: formData.repoter_address,
      locationOfDocument: formData.locationOfDocument,
    };

    const userToken = Cookies.get("authToken");

    try {
      const saveCard = await axiosInstance.post("card/create", requestBody, {
        headers: { Authorization: "Bearer " + userToken },
      });
      onSubmit(requestBody);
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        type: "",
        idNumber: "",
        repoter_name: "",
        repoter_phone: "",
        repoter_address: "",
        locationOfDocument: "",
        profileImg: "",
        dateReported: "",
      });
      modalOpen(false);
      console.log(saveCard);
    } catch (error) {
      console.log(error);
    }

    // Pass the data to the parent component
    // Close the modal // Send data to parent
  };

  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName.trim() === "" ||
      formData.lastName.trim() === "" ||
      formData.dob.trim() === "" ||
      formData.type.trim() === "" ||
      formData.idNumber.trim() === "" ||
      formData.profileImg.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }
    setError("");
    setFormType("reporter");
  };

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    modalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      type: "",
      idNumber: "",
      repoter_name: "",
      repoter_phone: "",
      repoter_address: "",
      locationOfDocument: "",
      profileImg: "",
      dateReported: "",
    });
    setFileName("");
    setFormType("card");
    setComplete(false);
  };

  return (
    <Container onClick={toggleModal}>
      <SubContainer>
        <TitleText>Add document</TitleText>

        {formType === "card" && (
          <Form1Container>
            <Form>
              <NamesContainer>
                <NameInputContainer>
                  <Label>First name</Label>
                  <NameInput
                    placeholder="Enter first name"
                    type="text"
                    name="firstName"
                    onChange={formChange}
                    value={formData.firstName}
                  />
                </NameInputContainer>
                <NameInputContainer>
                  <Label>Last name</Label>
                  <NameInput
                    placeholder="Enter last name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={formChange}
                  />
                </NameInputContainer>
              </NamesContainer>
              <InputAndLabelContainer>
                <Label>Date of birth</Label>
                <OtherInput
                  placeholder="Enter date of birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={formChange}
                />
              </InputAndLabelContainer>
              <InputAndLabelContainer>
                <Label>Document type</Label>
                <DropdownInput
                  onClick={() =>
                    dropdownActive
                      ? setDropdownActive(false)
                      : setDropdownActive(true)
                  }
                >
                  <Placeholder>
                    {formData.type === ""
                      ? "Select document type"
                      : formData.type}
                  </Placeholder>
                  <DropdownIcon src={arrow_down} />
                  <Dropdown $active={dropdownActive}>
                    <DropdownOption
                      onClick={() => handleDropdownMenuSelect("Ghana card")}
                    >
                      Ghana ID card
                    </DropdownOption>
                    <DropdownOption
                      onClick={() => handleDropdownMenuSelect("Passport")}
                    >
                      Passport
                    </DropdownOption>
                    <DropdownOption
                      onClick={() => handleDropdownMenuSelect("Other")}
                    >
                      Other
                    </DropdownOption>
                  </Dropdown>
                </DropdownInput>
              </InputAndLabelContainer>
              <InputAndLabelContainer>
                <Label>Document ID number</Label>
                <OtherInput
                  placeholder="Enter document ID number"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={formChange}
                />
              </InputAndLabelContainer>
              <Label>Upload image of document (front view)</Label>
              <ImageInputContainer>
                <ImageInputLabel $uploading={formData.profileImg} htmlFor="img">
                  <ImageInputIcon
                    src={
                      formData.profileImg === "" ? upload_icon2 : upload_icon1
                    }
                  />
                  {fileName === "" ? "Upload picture" : fileName}
                </ImageInputLabel>
                <ImageInput
                  type="file"
                  name="profileImg"
                  id="img"
                  onChange={handleImageUpload}
                />

                {uploading && (
                  <ImageUploadProressContainer>
                    <ImageUploadProgress progress={uploadProgress} />
                  </ImageUploadProressContainer>
                )}

                {formData.profileImg === "" && uploading === false && (
                  <ImageInputText> PNG, JPG or PDF (max. 10MB)</ImageInputText>
                )}
              </ImageInputContainer>
              <ButtonsContainer>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <NextButton onClick={handleNextClick} $completed={complete}>
                  Next
                </NextButton>
              </ButtonsContainer>
            </Form>
          </Form1Container>
        )}

        {formType === "reporter" && (
          <Form2Container>
            <Form onSubmit={handleSubmit}>
              <InputAndLabelContainer>
                <Label>Reporter's name</Label>
                <OtherInput
                  placeholder="Enter full name of reporter"
                  value={formData.repoter_name}
                  name="repoter_name"
                  onChange={formChange}
                />
              </InputAndLabelContainer>
              <InputAndLabelContainer>
                <Label>Reporter's address</Label>
                <IconAndInputContainer>
                  <ImageInputIcon src={location_icon} />
                  <InputWithIcon
                    placeholder="Eg. Ofankor Barrier"
                    value={formData.repoter_address}
                    name="repoter_address"
                    onChange={formChange}
                  />
                </IconAndInputContainer>
              </InputAndLabelContainer>
              <InputAndLabelContainer>
                <Label>Reporter's phone number</Label>
                <IconAndInputContainer>
                  <ImageInputIcon src={gh_flag} />
                  <CountryCode>233</CountryCode>
                  <InputWithIcon
                    placeholder="000 000 000"
                    name="repoter_phone"
                    value={formData.repoter_phone}
                    onChange={formChange}
                  />
                </IconAndInputContainer>
              </InputAndLabelContainer>
              <InputAndLabelContainer>
                <Label>Current location of document</Label>
                <IconAndInputContainer>
                  <ImageInputIcon src={location_icon} />
                  <InputWithIcon
                    placeholder="Eg. Ofankor police center"
                    name="locationOfDocument"
                    value={formData.locationOfDocument}
                    onChange={formChange}
                  />
                </IconAndInputContainer>
              </InputAndLabelContainer>
              <InputAndLabelContainer>
                <Label>Date reported</Label>
                <OtherInput
                  placeholder=""
                  type="date"
                  name="dateReported"
                  value={formData.dateReported}
                  onChange={formChange}
                />
              </InputAndLabelContainer>
              <ButtonsContainer>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <NextButton $completed={complete}>Save</NextButton>
              </ButtonsContainer>
            </Form>
          </Form2Container>
        )}
        <ErrorMessage>{error}</ErrorMessage>
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(1, 1, 1, 0.07);
  backdrop-filter: blur(5px);
`;

const SubContainer = styled.div`
  background-color: white;
  padding: 1.2rem 1.2rem;
  border-radius: 0.5rem;
  width: 22rem;
`;

const TitleText = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  font-weight: 600rem;
  color: rgba(52, 64, 84, 1);
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Form1Container = styled.div`
  width: 100%;
`;

const NamesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const NameInputContainer = styled.div`
  width: 50%;
`;

const NameInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 1);
  outline: none;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.8rem;
  color: rgba(52, 64, 84, 1);
  margin-bottom: 0.4rem;
`;

const InputAndLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const OtherInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 1);
  padding: 7px;
  font-size: 0.8rem;
  outline: none;
`;

const DropdownInput = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 1);
  height: 100%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
`;

const Placeholder = styled.p`
  color: rgba(102, 112, 133, 1);
  font-size: 0.8rem;
`;

const DropdownIcon = styled.img`
  transform: rotate(180deg);
`;

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  box-shadow: ${(props: DropdownProps) =>
    props.$active ? "0px 0px 10px rgba(16, 24, 40, 0.2)" : "none"};
  padding: ${(props: DropdownProps) => (props.$active ? "0.5rem" : 0)};
  width: 100%;
  left: 0;
  top: 2.5rem;
  border-radius: 0.5rem;
  height: ${(props: DropdownProps) => (props.$active ? "8.4rem" : 0)};
  background-color: white;
  transition: ease-in-out 0.2s;
  overflow: hidden;
`;

const DropdownOption = styled.p`
  color: rgba(16, 24, 40, 1);
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(249, 250, 251, 1);
  }
`;

const ImageInputContainer = styled.div`
  border: 1px dotted rgba(208, 213, 221, 1);
  border-radius: 0.5rem;
  padding: 1rem 1rem;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageInputLabel = styled.label<UploadButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props: UploadButtonProps) =>
    props.$uploading !== "" ? "rgba(34, 30, 32, 1)" : "rgba(0, 146, 6, 1)"};
  margin-bottom: 0.4rem;
  cursor: pointer;
`;

const ImageInputIcon = styled.img``;

const ImageInputText = styled.p`
  color: rgba(112, 122, 145, 1);
  font-size: 0.7rem;
`;

const ImageUploadProressContainer = styled.div`
  width: 100%;
  background-color: #1ab3739a;
  margin-top: 0.3rem;
`;

const ImageUploadProgress = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  background-color: rgba(26, 179, 115, 1);
  height: 0.3rem;
  transition: width 0.4s ease-in-out;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.2rem;
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  color: black;
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const NextButton = styled.button<SubmitBtnProps>`
  padding: 0.5rem 2rem;
  background-color: ${(props: SubmitBtnProps) =>
    props.$completed ? "#009205" : "rgba(0, 146, 6, 1)"};
  opacity: ${(props: SubmitBtnProps) => (props.$completed ? "1" : "0.5")};
  color: white;
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Form2Container = styled.div``;

const IconAndInputContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 1);
  padding: 7px 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const InputWithIcon = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 0.8rem;
`;

const CountryCode = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: #ff0048;
  margin-bottom: 0.5rem;
`;

export default AddDocumentModal;
