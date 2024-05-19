import React, { useEffect, useState } from "react";
import { ActionButton } from "../../components";
import { useNavigate } from "react-router-dom";
import api from "../../services/config";
import { UserInfoInterface } from "../../types/User";
import Loading from "../../components/Loading";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<UserInfoInterface>({
    name: "",
    avatar: null,
    email: "",
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("refreshToken");

    navigate("/signin");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await api.get("/auth/profile/", {
          headers: {
            Accept: "application/json;version=v1_web",
            "Content-Type": "application/json",
          },
        });

        setUserInfo(response.data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-1 flex-col h-dvh bg-blue-1">
      <div className="flex items-center justify-end h-[70px] px-[34px] bg-white">
        <ActionButton
          text="Logout"
          action={() => handleLogout()}
          width="w-[272px]"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col w-438px bg-white items-center rounded-[9px] p-[25px] w-[438px] drop-shadow-[0_0_64px_rgba(0,0,0,0.25)] ">
          {loading ? (
            <Loading size="20" />
          ) : (
            <>
              <p
                className="text-black text-base  font-[700]"
                data-testid="tittle-cypress"
              >
                Profile picture
              </p>
              <img
                className="bg-grey w-[58px] h-[56px] rounded-[9px] object-cover mt-[5px] mb-[25px]"
                alt="profileImage"
                src={
                  userInfo.avatar
                    ? userInfo.avatar
                    : "https://placehold.co/70x70/"
                }
                data-testid="avatar-cypress"
              />
              <div className="flex flex-auto flex-col w-[100%] mt-[15px]">
                <div
                  className="text-black text-base"
                  data-testid="name-cypress"
                >
                  Your <span className="font-[700]">Name</span>
                </div>
                <div
                  className="bg-grey rounded-[9px] px-[18px] py-[18px] text-[12px]"
                  data-testid="userName-cypress"
                >
                  {userInfo.name}
                </div>
              </div>
              <div
                className="flex flex-auto flex-col w-[100%] mt-[15px]"
                data-testid="email-cypress"
              >
                <div className="text-black text-base">
                  Your <span className="font-[700]">E-mail</span>
                </div>
                <div
                  className="bg-grey rounded-[9px] px-[18px] py-[18px] text-[12px]"
                  data-testid="userEmail-cypress"
                >
                  {userInfo.email}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
