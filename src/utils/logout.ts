export const logout = (
    navigate: (to: string) => void,
    setJwt: (value: string) => void,
    setKakaoLoginCode: (value: string) => void,
    setId: (value: string) => void
  ) => {
    setJwt("");
    setId("");
    setKakaoLoginCode("");
    localStorage.clear();
    navigate("/");
  };
  