import * as React from 'react';
import { IconTopBanner } from '../../../components/Icons';
import styles from '../../../styles/elements/banner/index.module.scss';
import Message from '../../../components/Message';

interface Props {
}

const Banner: React.FC<Props> = () => {
    return(
        <div className={styles.bannerBlock}>
            <div className={styles.bannerImage}>
                <IconTopBanner />
            </div>
            
            <div className={styles.slogan}>{Message('GLOBAL_SLOGAN')}</div>
        </div>
    )
};

export default Banner;
