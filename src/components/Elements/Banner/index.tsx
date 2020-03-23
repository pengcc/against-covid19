import * as React from 'react';
import { IconTopBanner } from '../../../components/Icons';
import styles from '../../../styles/elements/banner/index.module.scss';

interface Props {
    img: string,
    imgTitle: string,
    slogan: string
}

const Banner: React.FC<Props> = (props) => {
    const {img, imgTitle, slogan} = props;

    return(
        <div className={styles.bannerBlock}>
            <IconTopBanner />
            <div className={styles.slogan}>{slogan}</div>
        </div>
    )
};

export default Banner;
