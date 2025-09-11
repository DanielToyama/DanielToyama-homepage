import React, { useState, useEffect } from 'react';
import styles from './DxRating.module.css'; // 注意修改为.css而不是.sass

// 假设你已经将图片放在public目录下，比如public/assets/dxrating/
const getPlateId = (rating: number) => {
    const levels = [1000, 2000, 4000, 7000, 10000, 12000, 13000, 14000, 14500, 15000];
    if (rating < levels[0]) return '01';
    if (rating >= levels[9]) return '11';
    for (let i = 0; i < 9; i++) {
        if (rating >= levels[i] && rating < levels[i + 1]) return (i + 2).toString().padStart(2, '0');
    }
};

const getPlatePath = (rating: number) => `/assets/dxrating/UI_CMN_DXRating_${getPlateId(rating)}.avif`;

const SeparateText = ({ text }: { text: string }) => (
    <>
        {Array.from(text).map((char, index) => (
            <span key={index}>{char}</span>
        ))}
    </>
);

const DxRating = () => {
    const [dxRating, setDxRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dfReq = await fetch('https://124.220.188.199/api/v2/game/mai2/user-summary?username=Danieltoyama');
                const data = await dfReq.json();
                setDxRating(data.rating);
            } catch (error) {
                console.error('Failed to fetch DX rating:', error);
                setDxRating(14430);
            }
        };

        fetchData();
    }, []);

    if (!dxRating) return null;

    return (
        <div className={styles.container}>
            <img src={getPlatePath(dxRating)} alt="DX Rating Frame" />
            <div>
                {Array.from({ length: 5 - dxRating.toString().length }).map((_, index) => (
                    <span key={`empty-${index}`} />
                ))}
                <SeparateText text={dxRating.toString()} />
            </div>
        </div>
    );
};

export default DxRating;