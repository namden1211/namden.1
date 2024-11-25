import './search.css'
import React, { useEffect, useState } from 'react';
function Quanlydanhmuc() {
    let [fire, setFire] = useState([]);
    let [layso, setLayso] = useState();
    useEffect(() => {
        fetch('http://localhost:3000/selectdanhmuc')
            .then(response => response.json())
            .then(data => {
                setFire(data);
            })
            .catch(error => console.error(error));
    }, []);

    const xoadanhmuc = (so2) => {
        let xoadanhmuc;
        for (let i = 0; i < fire.length; i++) {
            if (fire[i].IDdanhmuc == so2) {
                xoadanhmuc = fire[i].IDdanhmuc;
                fetch('http://localhost:3000/xoadanhmuc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ xoadanhmuc })
                })
                    .then(response => response.text())
                    .then(manage => {
                        fetch('http://localhost:3000/selectdanhmuc')
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


    const themdanhmuc = () => {
        let id;
        for (let i = 0; i < fire.length; i++) {
            id = fire[i].IDdanhmuc + 1;
        }
        let tendanhmuc = document.getElementById("taikhoan").value;
        let danhmuchienthi = document.getElementById("matkhau").value;
        let themdanhmuc = { id, tendanhmuc, danhmuchienthi };
        if (tendanhmuc.trim().includes(' ')) {
            window.alert("Tên danh mục không được chứa khoảng trống");
            return;
        } else {
            fetch('http://localhost:3000/themdanhmuc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(themdanhmuc)
            })
                .then(response => response.text())
                .then(manage => {
                    fetch('http://localhost:3000/selectdanhmuc')
                        .then(response => response.json())
                        .then(dat => {
                            setFire(dat);
                        })
                        .catch(error => console.error(error));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            window.alert("Thêm danh mục thành công");
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        }

    }

    const doiten = () => {
        let tendanhmucmoi = document.getElementById(`tendanhmucmoi${layso}`).value;
        let nhaptendanhmucmoi = document.getElementById(`danhmuchienthi${layso}`).value;
        let id = layso;
        if (tendanhmucmoi.trim().includes(' ')) {
            window.alert("Tên danh mục không được chứa khoảng trống");
            return;
        } else {
            let thaydanhmuc = { id, tendanhmucmoi, nhaptendanhmucmoi };
            fetch('http://localhost:3000/doitendanhmuc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thaydanhmuc)
            })
                .then(response => response.text())
                .then(manage => {
                    fetch('http://localhost:3000/selectdanhmuc')
                        .then(response => response.json())
                        .then(data => {
                            setFire(data);
                        })
                        .catch(error => console.error(error));
                    setLayso(layso);
                });
            window.alert("Đổi tên danh mục thành công");
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });


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
    const modoitendanhmuc = (so4) => {
        let modal = document.getElementById(`doimatkhau${so4}`);
        if (modal) {
            modal.style.display = "block";
        }
        setLayso(so4);
    }
    function dongdoitendanhmuc(so5) {
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
            <div class='cachxa'></div>
            <div class='cachxa'></div>
            <div class='row'>

                <div class='col-sm-1'></div>
                <div class='col-sm-10'>
                    <div class='row'>
                        <div class='col-sm-2'>
                            <i class="fa-solid fa-plus dauthemdanhmuc" onClick={momodal}></i>
                            <div id="Modal" class="modal">
                                <div class="modal-content">
                                    <div class="row">
                                        <div class="col-sm-11"></div>
                                        <div class="col-sm-1">
                                            <div onClick={dongmodal}><i class="fa-solid fa-xmark close"></i></div>
                                        </div>
                                    </div>
                                    <h2>Thêm Danh mục</h2>
                                    <b class='themdanhmuc'>Danh mục mới</b>
                                    <input class="dodai3" type="text" placeholder="Thêm danh mục" id="taikhoan" />
                                    <b class='themdanhmuc1'>Tên danh mục mới</b>
                                    <input class="dodai3" type="text" placeholder="Danh mục hiển thị" id="matkhau" />
                                    <button onClick={themdanhmuc} class="bamdoimatkhau">Thêm danh mục</button>
                                </div>
                            </div>
                        </div>
                        <div class='col-sm-10'>
                            <h1 class='quanlydanhmuc'>Danh sách danh mục</h1>
                        </div>
                    </div>
                    <table class="table table-striped cangiua">
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Danh mục</th>
                                <th>Tên danh mục</th>
                                <th>Chỉnh sửa</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {fire.map((drama) => <tr key={drama.IDdanhmuc}>
                                <td>{drama.stt}</td>
                                <td>{drama.danhmuc}</td>
                                <td>{drama.danhmuchienthi}</td>

                                <td><i class="fa-solid fa-pen-to-square dauxoa" onClick={() => modoitendanhmuc(drama.IDdanhmuc)}></i>
                                    <div id={`doimatkhau${drama.IDdanhmuc}`} class="modal">
                                        <div class="modal-content">
                                            <div class="row">
                                                <div class="col-sm-11"></div>
                                                <div class="col-sm-1">
                                                    <div onClick={() => dongdoitendanhmuc(drama.IDdanhmuc)}><i class="fa-solid fa-xmark close"></i></div>
                                                </div>
                                            </div>
                                            <h2>Đổi tên danh mục</h2>
                                            <b class='themdanhmuc3'>Danh mục</b>
                                            <input class="dodai3" type="text" placeholder="Danh mục" id={`tendanhmucmoi${drama.IDdanhmuc}`} />
                                            <b class='themdanhmuc2'>Tên danh mục</b>
                                            <input class="dodai3" type="text" placeholder="Tên danh mục" id={`danhmuchienthi${drama.IDdanhmuc}`} />
                                            <button class="bamdoimatkhau" onClick={() => doiten(drama.ID)}>Đổi tên danh mục</button>
                                        </div>
                                    </div>
                                </td>

                                <td> <i class="fa-solid fa-trash dauxoa" onClick={() => xoadanhmuc(drama.IDdanhmuc)}></i></td>
                            </tr>)}
                        </tbody>
                    </table>

                </div>
                <div class='col-sm-1'></div>
            </div>
        </>
    )
}
export default Quanlydanhmuc;