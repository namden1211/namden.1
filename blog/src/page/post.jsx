import { useEffect, useRef, useState } from 'react';
import './search.css'
function Post() {

    let [login, setLogin] = useState();
    let [fire, setFire] = useState([]);

    // bangdanhmuc
    let [danhmucc, setDanhmucc] = useState([]);

    // hien tieu de, anh, noi dung ... bai sua
    let [hienbaisua, sethienBaisua] = useState([]);

    // sua bai
    let [tieude, setTieude] = useState('');
    let [noidung, setNoidung] = useState('');
    let [noidungchitiet, setNoidungChitiet] = useState('');
    // hien anh
    let [anh, setAnh] = useState("");

    // luu gia tri de ko bi xoa
    let khongDoi = useRef({});

    useEffect(() => {
        let idsua = window.location.href.split('/').pop();
        fetch('http://localhost:3000/themid')
            .then(response => response.json())
            .then(data => {
                setFire(data);
            })
            .catch(error => console.error(error));
        fetch('http://localhost:3000/selectdanhmuc')
            .then(response => response.json())
            .then(dan => {
                setDanhmucc(dan);
            })
            .catch(error => console.error(error));

        fetch('http://localhost:3000/suabaiviet?idbaisua=' + idsua)
            .then(response => response.json())
            .then(suabai => {
                if (window.location.href == "http://localhost:5173/post") {
                    sethienBaisua(true);
                } else {
                    sethienBaisua(false);
                    setTieude(suabai.tieude);
                    setNoidung(suabai.noidung);
                    setNoidungChitiet(suabai.noidungchitiet);
                    setAnh(suabai.img);
                    khongDoi.id = suabai.ID;
                    khongDoi.img = suabai.img;
                    khongDoi.tieude = suabai.tieude;
                    khongDoi.noidung = suabai.noidung;
                    khongDoi.noidungchitiet = suabai.noidungchitiet;

                }
            })
            .catch(error => console.error(error));

    }, []);

    // ngay dang
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let ngayDang = day + '/' + month + '/' + year + " " + hours + ":" + minutes + " PM";

    // ngay dang
    khongDoi.ngaydang = ngayDang;

    // tieu de
    function dlt(hg1) {
        khongDoi.tieude = hg1.target.value;
    }

    // noi dung
    function dltc(hg2) {
        khongDoi.noidung = hg2.target.value;
    }

    // noi dung chi tiet
    function nhg(hg3) {
        khongDoi.noidungchitiet = hg3.target.value;
    }

    // danh muc va id danh muc
    const danhmuc = (hg4) => {
        khongDoi.danhmuc = hg4.target.value;
        khongDoi.idketnoi = hg4.target.selectedOptions[0].id;
    }

    // chon anh trong file va cap nhat state anh
    const inputElement = document.querySelector('#gg');
    if (inputElement) {
        inputElement.onchange = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                setAnh(reader.result);
                khongDoi.img = reader.result;
            }
            reader.readAsDataURL(this.files[0]);
        };
    }

    // dang bai
    const ocl = () => {

        // id bai bao
        let tst;
        for (let i = 0; i < fire.length; i++) {
            tst = fire[i].ID;
            khongDoi.id = tst + 1;
        }
        // xoa value input va textarea
        const inputs = document.querySelectorAll('input');
        const textareas = document.querySelectorAll('textarea');

        inputs.forEach(input => {
            input.value = '';
        });

        document.getElementById("xoa").src = "";
        textareas.forEach(textarea => {
            textarea.value = '';
        });

        // api them bai
        fetch('http://localhost:3000/post', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khongDoi)
        })
            .then(response => response.text())
            .then(manage => {
                window.alert("Đăng bài thành công");
                // window.location.href = 'http://localhost:5173/post'
            }).catch((error) => {
                console.error('Error:', error);
            });

    }



    // sua bai

    const handleChangeTieude = (event) => {
        setTieude(event.target.value);
        khongDoi.tieude = event.target.value;
    };

    const handleChangeNoidung = (event) => {
        setNoidung(event.target.value);
        khongDoi.noidung = event.target.value;
    };

    const handleChangeNoidungChitiet = (event) => {
        setNoidungChitiet(event.target.value);
        khongDoi.noidungchitiet = event.target.value;
    };

    const danglai = () => {

        // xoa value input va textarea
        const inputs = document.querySelectorAll('input');
        const textareas = document.querySelectorAll('textarea');

        inputs.forEach(input => {
            input.value = '';
        });

        document.getElementById("xoa").src = "";
        textareas.forEach(textarea => {
            textarea.value = '';
        });

        // api sua bai
        fetch('http://localhost:3000/capnhatbaivietdasua', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(khongDoi)
        })
            .then(response => response.text())
            .then(manage => {
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        window.alert("Chỉnh sửa thành công");
        window.location.href = 'http://localhost:5173/quanlytintuc';
    }


    return (
        <>
            {hienbaisua ?
                <div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2 "></div>
                        <div class="col-sm-9">
                            <div class='post'>
                                <br />
                                <div class="chu" >Tiêu Đề</div>
                                <input onChange={dlt} class="comment1" /><br /><br />


                                <input type="file" name="image_file" id='gg' />
                                <div class='cachxa'></div>
                                <div class="chu">Hình ảnh minh họa</div>
                                <div class="anh">
                                    <img src={anh} id='xoa' class="anh1" />
                                </div><br /><br />
                                <div class="chu">Nội dung</div>
                                <form>
                                    <textarea class="comment" rows="2" onChange={dltc}></textarea><br /><br />
                                </form>
                                <div class="chu">Nội dung chi tiết</div>
                                <form>
                                    <textarea class="comment" rows="5" onChange={nhg}></textarea><br /><br />
                                </form>

                                <label class="chu">Danh mục:</label>
                                <select name='danhmuc' class="di chu" onChange={danhmuc} id='aaa'>
                                    <option value="danhmuc" class="chu">Danh mục</option>
                                    {danhmucc.map((dm) => <option value={dm.danhmuc} class="chu" key={dm.IDdanhmuc} id={dm.IDdanhmuc}>{dm.danhmuchienthi}</option>)}
                                </select><br /><br />
                                <button class="mauxanh" onClick={ocl}>Đăng bài</button><br /><br />
                            </div>
                        </div>

                        <div class="col-sm-1"></div>
                    </div>
                    <br />
                </div>
                :
                <div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2 "></div>
                        <div class="col-sm-9">
                            <div class='post'>
                                <br />
                                <div class="chu" >Tiêu Đề</div>
                                <input onChange={handleChangeTieude} class="comment1" value={tieude} /><br /><br />


                                <input type="file" name="image_file" id='gg' />
                                <div class='cachxa'></div>
                                <div class="chu">Hình ảnh minh họa</div>
                                <div class="anh">
                                    <img src={anh} id='xoa' class="anh1" />
                                </div><br /><br />
                                <div class="chu">Nội dung</div>
                                <form>
                                    <textarea class="comment" rows="2" onChange={handleChangeNoidung} value={noidung}></textarea><br /><br />
                                </form>
                                <div class="chu">Nội dung chi tiết</div>
                                <form>
                                    <textarea class="comment" rows="5" onChange={handleChangeNoidungChitiet} value={noidungchitiet}></textarea><br /><br />
                                </form>
                                <button class="mauxanh" onClick={danglai}>Lưu</button>
                            </div>
                        </div>

                        <div class="col-sm-1"></div>
                    </div>
                    <br />
                </div>
            }
        </>
    )
}
export default Post;