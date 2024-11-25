import './search.css'
import React, { useEffect, useState, useRef } from 'react';
function Register(props) {
    let [fire, setFire] = useState([]);
    let [layso, setLayso] = useState();
    useEffect(() => {
        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then(data => {
                setFire(data);
            })
            .catch(error => console.error(error));
    }, []);


    const themtaikhoan = () => {
        let taikhoan = document.getElementById("taikhoan").value;
        let matkhau = document.getElementById("matkhau").value;
        let nhaplaimatkhau = document.getElementById("nhaplaimatkhau").value;
        let themnguoidung = { taikhoan, matkhau };
        if (matkhau == nhaplaimatkhau) {
            fetch('http://localhost:3000/themtaikhoan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(themnguoidung)
            })
                .then(response => response.text())
                .then(manage => {
                    fetch('http://localhost:3000/user')
                        .then(response => response.json())
                        .then(dat => {
                            setFire(dat);
                        })
                        .catch(error => console.error(error));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            window.alert("Đăng ký thành công");
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });

        } else {
            window.alert("sai mat khau");
        }

    }

    const themtaikhoan1 = (so1) => {
        if (so1.key === "Enter") {
            let taikhoan = document.getElementById("taikhoan").value;
            let matkhau = document.getElementById("matkhau").value;
            let nhaplaimatkhau = document.getElementById("nhaplaimatkhau").value;
            const themnguoidung = { taikhoan, matkhau };
            if (matkhau == nhaplaimatkhau) {
                fetch('http://localhost:3000/themtaikhoan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(themnguoidung)
                })
                    .then(response => response.text())
                    .then(manage => {
                        fetch('http://localhost:3000/user')
                            .then(response => response.json())
                            .then(dat => {
                                setFire(dat);
                            })
                            .catch(error => console.error(error));
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                window.alert("Đăng ký thành công");
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
                });

            } else {
                window.alert("sai mat khau");
            }
        }
    }

    const xoabaiviet = (so2) => {
        console.log(so2);
        let xoabai;
        for (let i = 0; i < fire.length; i++) {
            if (fire[i].ID == so2) {
                xoabai = fire[i].ID;
                fetch('http://localhost:3000/xoataikhoan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ xoabai })
                })
                    .then(response => response.text())
                    .then(manage => {
                        fetch('http://localhost:3000/user')
                            .then(response => response.json())
                            .then(dat => {
                                setFire(dat);
                            })
                            .catch(error => console.error(error));
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }

    }
    
    const doimatkhaumoi = () => {
        let matKhaumoi = document.getElementById(`matkhaumoi${layso}`).value;
        let nhapLaimatkhaumoi = document.getElementById(`nhaplaimatkhaumoi${layso}`).value;
        let id = layso;
        let thayMatkhau = { id, matKhaumoi, nhapLaimatkhaumoi };
        if (matKhaumoi == nhapLaimatkhaumoi) {
            fetch('http://localhost:3000/doimatkhau', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thayMatkhau)
            })
                .then(response => response.text())
                .then(manage => {
                });
            window.alert("Đổi mật khẩu thành công");
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        } else {
            window.alert("sai mat khau");
        }

    }

    

    function momodal() {
        let modal = document.getElementById("Modal");
        if (modal) {
            modal.style.display = "block";
        }
    }
    function dongmodal() {
         let modal = document.getElementById("Modal");
        if (modal) {
            modal.style.display = "none";
        }
    }
    const modoimatkhau = (so4) => {
        let modal = document.getElementById(`doimatkhau${so4}`);
        if (modal) {
            modal.style.display = "block";
        }
        setLayso(so4);
    }
    function dongdoimatkhau(so5) {
        let modal = document.getElementById(`doimatkhau${so5}`);
        if (modal) {
            modal.style.display = "none";
        }
    }

    for (let i = 0; i < fire.length; i++) {
        fire[i].stt = i + 1;
    }

    return (
        <>
            <div class="debangogiua"></div>
            <div class="row">
                <div class="col-sm-1"></div>

                <div class="col-sm-10">
                    <div class="chungdong">

                        <div class="col-sm-3 cangiuathemtaikhoan">
                            <i class="fa-solid fa-plus dauthemtaikhoan" onClick={momodal}></i>
                            <div id="Modal" class="modal">
                                <div class="modal-content">
                                    <div class="row">
                                        <div class="col-sm-11"></div>
                                        <div class="col-sm-1">
                                            <div onClick={dongmodal}><i class="fa-solid fa-xmark close"></i></div>
                                        </div>
                                    </div>
                                    <h2>Thêm tài khoản</h2>
                                    <input class="dodai2" type="text" placeholder="Email hoặc số điện thoại" id="taikhoan" />
                                    <input class="dodai2" type="password" placeholder="Mật khẩu" id="matkhau" />
                                    <input class="dodai2" type="password" placeholder="Nhập lại mật khẩu" id="nhaplaimatkhau" onKeyUp={themtaikhoan1} />
                                    <button onClick={themtaikhoan} class="bam1">Đăng ký</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-9">
                            <h1 class='quanlytaikhoan' >Danh sách tài khoản</h1>
                        </div>

                    </div>

                    <table class="table table-striped cangiua">
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Tài khoản</th>
                                <th>Đổi mật khẩu</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {fire.map((drama) => <tr key={drama.ID}>
                                <td>{drama.stt}</td>
                                <td>{drama.taikhoan}</td>

                                <td><i class="fa-solid fa-pen-to-square dauxoa" onClick={() => modoimatkhau(drama.ID)}></i>
                                    <div id={`doimatkhau${drama.ID}`} class="modal">
                                        <div class="modal-content">
                                            <div class="row">
                                                <div class="col-sm-11"></div>
                                                <div class="col-sm-1">
                                                    <div onClick={() => dongdoimatkhau(drama.ID)}><i class="fa-solid fa-xmark close"></i></div>
                                                </div>
                                            </div>
                                            <h2>Đổi mật khẩu</h2>
                                            <b class='doimatkhau'>Mật khẩu mới</b>
                                            <input class="dodai3" type="password" placeholder="Mật khẩu mới" id={`matkhaumoi${drama.ID}`} />
                                            <b class='nhaplaimatkhau'>Nhập lại mật khẩu</b>
                                            <input class="dodai3" type="password" placeholder="Nhập lại mật khẩu" id={`nhaplaimatkhaumoi${drama.ID}`} />
                                            <button class="bamdoimatkhau" onClick={() => doimatkhaumoi(drama.ID)}>Đổi mật khẩu</button>
                                        </div>
                                    </div>
                                </td>

                                <td> <i class="fa-solid fa-trash dauxoa" onClick={() => xoabaiviet(drama.ID)}></i></td>
                            </tr>)}
                        </tbody>
                    </table>



                </div>

                <div class="col-sm-1"></div>

            </div>

        </>
    )


}
export default Register;