import './search.css'
import React, { useEffect, useState } from 'react';

function Home() {
    let [fire, setFire] = useState([]);
    let [tinhot, setTinhot] = useState([]);
    let [hientinhot, setHientinhot] = useState();
    let [dan, setDan] = useState([]);
    let tieudedanhmuc;
    let danhmuc;
    useEffect(() => {
        if (window.location.href == "http://localhost:5173/home") {
            setHientinhot(true);
        } else {
            setHientinhot(false);
        }
    }, []);
    useEffect(() => {
        if (window.location.href == "http://localhost:5173/home") {
            fetch('http://localhost:3000/tintuc')
                .then(response => response.json())
                .then(data => {
                    setFire(data);
                })
                .catch(error => console.error(error));
            fetch('http://localhost:3000/tinhot')
                .then(response => response.json())
                .then(th => {
                    setTinhot(th);
                })
                .catch(error => console.error(error));
        } else {
            danhmuc = window.location.href.split('/').pop();
            fetch('http://localhost:3000/danhmuc?linkdanhmuc=' + danhmuc)
                .then(response => response.json())
                .then(danhmuc => {
                    setFire(danhmuc);
                })
                .catch(error => console.error(error));
        }
    }, []);
    useEffect(() => {
        fetch('http://localhost:3000/selectdanhmuc')
            .then(response => response.json())
            .then(abc => {
                setDan(abc)
            })
            .catch(error => console.error(error));
    }, []);

    for (let i = 0; i < dan.length; i++) {
        if (window.location.href == "http://localhost:5173/home/" + dan[i].danhmuc) {
            tieudedanhmuc = dan[i].danhmuchienthi;
        }
    }
    let noiTu = "http://localhost:5173/detail/";

    return (
        <>
            <div class='cachxa'></div>
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <div class="tendanhmuc">{tieudedanhmuc}</div>
                    <div class='cachxa'></div>
                </div>
                <div class="col-sm-2"></div>
            </div>
            {hientinhot ?
                <div>
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8 chungdong">
                            <div class="col-sm-8">
                                <a class='aa' href={noiTu.concat(tinhot.ID)}>
                                    <img class='anhtinhot' src={tinhot.img} />
                                </a>
                            </div>
                            <div class="col-sm-4">
                                <div class='chutinhot'>
                                    <a class='aa tieudetinhot' href={noiTu.concat(tinhot.ID)}>{tinhot.tieude}</a>
                                    <div class='cachxa'></div>
                                    <a class='aa noidungtinhot' href={noiTu.concat(tinhot.ID)}>{tinhot.noidung}</a>
                                    <div class='ngaydangtinhot'>{tinhot.ngaydang}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8">
                            <hr class='hrtinhot' />
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                </div> : <div></div>
            }

            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8 chungdong">
                    {fire.map((drama) => <div class="col-sm-4 ngaygio" id={drama.ID} key={drama.ID}>
                        <div class="dodaithetrangchu">
                            <a href={noiTu.concat(drama.ID)}>
                                <img class="dodaianhtrangchu" src={drama.img} />
                            </a>
                            <div class='ngaydang'>{drama.ngaydang}</div>
                            <a href={noiTu.concat(drama.ID)} class="chutheatrangchu">{drama.tieude}</a>
                        </div>
                        <div class='cachxa'></div>
                        <div class='cachxa'></div>
                    </div>)}
                </div>
                <div class="col-sm-2"></div>
            </div>
        </>
    )
}
export default Home;