import './search.css'
import React, { useEffect, useState } from 'react';
function Login() {
    let [fire, setFire] = useState([]);
    let nguoidangnhap = {};
    useEffect(() => {
        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then(data => {
                setFire(data);
            })
            .catch(error => console.error(error));
    }, []);

    let danhSachNguoiDung = fire;

    function luudulieu2(nhanphim) {
        if (nhanphim.key === "Enter") {
            let taikhoan = document.getElementById("taikhoan").value;
            let matkhau = document.getElementById("matkhau").value;
            let dangNhapThanhCong = { taikhoan, matkhau };
            fetch('http://localhost:3000/dangnhap', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dangNhapThanhCong)
            })
                .then(response => response.text())
                .then(manage => {
                    if (manage.length > 0) {
                        window.location.href = 'http://localhost:5173/home';
                    } else {
                        window.alert("Sai tên đăng nhập hoặc mật khẩu");
                        document.getElementById("matkhau").value = '';
                    }
                });

            // fetch('http://localhost:3000/dangnhap?mahoa=' + matkhau.value)
            //     .then(response => response.json())
            //     .then(data => {
            //         let mahoa = data.hashed_value;
            //         for (let i = 0; i < danhSachNguoiDung.length; i++) {
            //             if (danhSachNguoiDung[i].taikhoan == taikhoan.value && danhSachNguoiDung[i].matkhau == mahoa) {
            //                 dangNhapThanhCong = true;
            //                 nguoidangnhap.taikhoan = danhSachNguoiDung[i].taikhoan;
            //                 nguoidangnhap.quyen = danhSachNguoiDung[i].quyen;
            //                 localStorage.setItem("nguoidangnhap", JSON.stringify(nguoidangnhap));
            //             }
            //         }
            //         if (dangNhapThanhCong == true) {
            //             localStorage.setItem("phiendangnhap", 1);
            //             window.location.href = "http://localhost:5173/home";
            //         } else {
            //             window.alert("Sai tên đăng nhập hoặc mật khẩu");
            //             document.getElementById("matkhau").value = '';
            //             localStorage.setItem("phiendangnhap", 0);
            //             localStorage.setItem("nguoidangnhap", 0);
            //         }
            //     })
            //     .catch(error => console.error(error));
        }
    }
    function luudulieu3() {
        let taikhoan = document.getElementById("taikhoan").value;
        let matkhau = document.getElementById("matkhau").value;
        let dangNhapThanhCong = { taikhoan, matkhau };
        fetch('http://localhost:3000/dangnhap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dangNhapThanhCong)
        })
            .then(response => response.text())
            .then(manage => {
                if (manage.length > 0) {
                    window.location.href = 'http://localhost:5173/home';
                } else {
                    window.alert("Sai tên đăng nhập hoặc mật khẩu");
                    document.getElementById("matkhau").value = '';
                }
            });

        // let taikhoan = document.getElementById("taikhoan");
        // let matkhau = document.getElementById("matkhau");
        // let dangNhapThanhCong;
        // fetch('http://localhost:3000/dangnhap?mahoa=' + matkhau.value)
        //     .then(response => response.json())
        //     .then(data => {
        //         let mahoa = data.hashed_value;
        //         for (let i = 0; i < danhSachNguoiDung.length; i++) {
        //             if (danhSachNguoiDung[i].taikhoan == taikhoan.value && danhSachNguoiDung[i].matkhau == mahoa) {
        //                 dangNhapThanhCong = true;
        //                 nguoidangnhap.taikhoan = danhSachNguoiDung[i].taikhoan;
        //                 nguoidangnhap.quyen = danhSachNguoiDung[i].quyen;
        //                 localStorage.setItem("nguoidangnhap", JSON.stringify(nguoidangnhap));
        //             }
        //         }
        //         if (dangNhapThanhCong == true) {
        //             localStorage.setItem("phiendangnhap", 1);
        //             window.location.href = "http://localhost:5173/home";
        //         } else {
        //             window.alert("Sai tên đăng nhập hoặc mật khẩu");
        //             document.getElementById("matkhau").value = '';
        //             localStorage.setItem("phiendangnhap", 0);
        //             localStorage.setItem("nguoidangnhap", 0);
        //         }
        //     })
        //     .catch(error => console.error(error));
    }







    return (
        <>
            <br /><br /><br />
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-10 row">
                    <div class="col-sm-3"></div>

                    <div class="col-sm-6">
                        <div class="login1 ">
                            <div class="vien1">
                                <div class="debangogiua"></div>
                                <h2>Đăng nhập</h2>

                                <input class="dodai1" type="text" placeholder="Email hoặc số điện thoại" id="taikhoan" />

                                <input class="dodai1" type="password" placeholder="Mật khẩu" id="matkhau" onKeyUp={luudulieu2} /><br />

                                <button class="bam" onClick={luudulieu3} >Đăng nhập</button>
                                <div class='cachxa'></div>
                                <a href="http://localhost:5173/home" class='chulogin'><b>Trang chủ</b></a>

                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3"></div>
                </div>
                <div class="col-sm-1"></div>
            </div>


        </>
    )
}
export default Login;