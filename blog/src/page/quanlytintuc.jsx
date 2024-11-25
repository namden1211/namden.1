import './search.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Quanlytintuc() {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/quanlytintuc?page=${page}`);
                setItems(prevItems => [...prevItems, ...response.data]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        loadItems();
    }, [page]);

    const handleScroll = () => {
        console.log("handleScroll");
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);



    const xoabaiviet = (so2) => {
        let xoabai;
        for (let i = 0; i < items.length; i++) {
            if (items[i].ID == so2) {
                xoabai = items[i].ID;
                fetch('http://localhost:3000/xoatintuc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ xoabai })
                })
                    .then(response => response.text())
                    .then(manage => {
                        fetch('http://localhost:3000/tintuc')
                            .then(response => response.json())
                            .then(dat => {
                                setItems(dat);
                            })
                            .catch(error => console.error(error));
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }

    }


    for (let i = 0; i < items.length; i++) {
        items[i].stt = i + 1;
    }


    return (
        <>
            <div class='cachxa'></div>
            <div class='cachxa'></div>
            <div class='row'>
                <div class='col-sm-1'></div>
                <div class='col-sm-10'>
                    <h1 class='cangiua'>Danh sách tin tức</h1>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Tiêu đề bài báo</th>
                                <th class='cangiua'>Chỉnh sửa</th>
                                <th >Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {items.map((drama) => <tr key={drama.ID}>
                                <td>{drama.stt}</td>
                                <td>{drama.tieude}</td>
                                <td class='cangiua'><a class='aa' href={'http://localhost:5173/post/' + drama.ID}><i class="fa-solid fa-pen-to-square dauxoa"></i></a></td>
                                <td> <i class="fa-solid fa-trash dauxoa delete" onClick={() => xoabaiviet(drama.ID)}></i></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div class='col-sm-1'></div>
            </div>
        </>
    )
}
export default Quanlytintuc;