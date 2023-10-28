
import "./AuthPage.css"
import swal from 'sweetalert';
import { Dialog } from "@mui/material";
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from "../../src/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo_of_Twitter.png"

function AuthPage() {


    const dispatch = useDispatch();


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [openlogin, setopenlogin] = React.useState(false);

    const handleClickopenlogin = () => {
        setopenlogin(true);
    };

    const handlecloselogin = () => {
        setopenlogin(false);
    };

    const [formData, setFormData] = React.useState({
        ad: '',
        soyad: '',
        email: '',
        sifre: ''
    });
    // Function to update the state variable when input changes
    const handleInputChange = (event, fieldName) => {
        const newValue = event.target.value;
        setFormData({
            ...formData,
            [fieldName]: newValue
        });
    };
    const [formDatalogin, setFormDatalogin] = React.useState({
        email: '',
        sifre: ''
    });
    // Function to update the state variable when input changes
    const handleInputChangelogin = (event, fieldName) => {
        const newValue = event.target.value;
        setFormDatalogin({
            ...formDatalogin,
            [fieldName]: newValue
        });
    };


    const { authLoading} = useSelector(state => state.auth)

    const navigate = useNavigate();

    const registerButtonHandle = async (e) => {
        e.preventDefault();

        try {
            const body = formData
            dispatch(registerUser(body)).then((arg) => {
                console.log(arg);
                if(arg.payload.success){
                    swal("Başarıyla Kayıt Oldun", "Twitter'a hoşgeldin", "success").then(() => {
    
                        navigate("/")
                    });

                }else{
                    swal("Hata", arg.payload.message, "error")

                }
            })

        } catch (error) {
            console.error("Error:", error);
        }
    }


    const loginButtonHandle = async (e) => {
        e.preventDefault()
        const body = formDatalogin

        try {

            dispatch(loginUser(body)).then((arg) => {
                if(arg.payload.success){
                    swal("Başarıyla Giriş Yapıldı", "Twitter'a hoşgeldin", "success").then(() => {
    
                        navigate("/")
                    });

                }else{
                    swal("Hata", arg.payload.message, "error")

                }
            })
        } catch (error) {
            console.error("Error:", error);
        }
    }



    return (
        <div className="d-flex justify-content-center align-items-center w-100">
            <div className="w-50 d-flex justify-content-center align-items-center">
                <div>

                    <img src={logo} alt="" />
                </div>

            </div>
            <div className="w-50 d-flex align-items-center">
                <div className="loginekrani d-flex flex-column">
                    <h3 className="suan">Şu anda olup bitenler</h3>
                    <h3 className="suan2">Hemen Katıl.</h3>
                    <button onClick={handleClickOpen} className="registerbutton bttn">Kayıt Ol</button>
                    <h3 className="suan3 pt-3">Zaten bir hesabın var mı?</h3>
                    <button onClick={handleClickopenlogin} className="loginbutton bttn">Giriş Yap</button>
                </div>

            </div>

            <Dialog sx={{
                backgroundColor: "rgba(236, 236, 236, 0.4)"
            }} open={open} onClose={handleClose}>
                <div className="anadialogregister">
                    <div className="icdialogregister d-flex">

                        <div className="closeicon" onClick={handleClose}>
                            <CloseIcon sx={{ color: "white" }}></CloseIcon>

                        </div>
                        <div className="registersagtaraf">

                            <div className="hesapolusturh4" >
                                <h3>Hesabını Oluştur</h3>
                            </div>
                            <form onSubmit={(e) => registerButtonHandle(e)} className="d-flex flex-column">

                                <div className="d-flex isimregister">
                                    <div className="isimregister2">

                                        <div className="form-floating">
                                            <div className="form-floating" action="">
                                                <input value={formData.ad} minLength={2}
                                                    onChange={(e) => handleInputChange(e, 'ad')} required type="text" className="form-control m-0" id="floatingInput1" placeholder="name@example.com" />
                                                <label htmlFor="floatingInput1">İsim</label>


                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-floating">
                                        <input value={formData.soyad} minLength={2}
                                            onChange={(e) => handleInputChange(e, 'soyad')} required type="text" className="form-control m-0" id="floatingInput5" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput5">Soyisim</label>
                                    </div>

                                </div>
                                <div className="emailregister">

                                    <div className="form-floating">
                                        <input
                                            value={formData.email}
                                            onChange={(e) => handleInputChange(e, 'email')} required type="email" className="form-control m-0" id="floatingInput4" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput4">Email adresi</label>
                                    </div>


                                </div>
                                <div className="passwordregister">
                                    <div className="form-floating">
                                        <input
                                            value={formData.sifre} minLength={6}
                                            onChange={(e) => handleInputChange(e, 'sifre')} required type="password" className="form-control m-0" id="floatingInput3" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput3">Şifre</label>
                                    </div>
                                </div>
                                <button type="submit" onSubmit={(e) => registerButtonHandle(e)} className="buttonregister">{authLoading? <span className="spinner-border"></span> : "Kayıt Ol"}</button>

                            </form>

                        </div>
                    </div>
                </div>
            </Dialog>


            <Dialog sx={{
                backgroundColor: "rgba(236, 236, 236, 0.4)"
            }} open={openlogin} onClose={handlecloselogin}>

                <div className="anadialoglogin">
                    <div className="icdialoglogin d-flex">

                        <div className="closeicon" onClick={handlecloselogin}>
                            <CloseIcon sx={{ color: "white" }}></CloseIcon>

                        </div>
                        <div className="loginsagtaraf">

                            <div className="hesapolusturh4" >
                                <h3>Giriş Yap</h3>
                            </div>
                            <form onSubmit={(e) => loginButtonHandle(e)} className="d-flex flex-column">
                                <div className="emaillogin">

                                    <div className="form-floating">
                                        <input
                                            value={formDatalogin.email}
                                            onChange={(e) => handleInputChangelogin(e, 'email')} required type="email" className="form-control m-0" id="floatingInput54" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput54">Email adresi</label>
                                    </div>


                                </div>
                                <div className="passwordlogin">
                                    <div className="form-floating">
                                        <input
                                            value={formDatalogin.sifre} minLength={6}
                                            onChange={(e) => handleInputChangelogin(e, 'sifre')} required type="password" className="form-control m-0" id="floatingInput32" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput32">Şifre</label>
                                    </div>
                                </div>
                                <button type="submit" onSubmit={(e) => loginButtonHandle(e)} className="buttonlogin">{authLoading? <span className="spinner-border"></span> : "Giriş Yap"}</button>

                            </form>

                        </div>
                    </div>
                </div>
            </Dialog>

        </div>
    );
}


export default AuthPage;