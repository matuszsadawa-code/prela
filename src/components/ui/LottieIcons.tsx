import React from 'react'
import Lottie from 'lottie-react'

// Inline heart animation data (simplified Lottie JSON)
const heartAnimationData = {
    v: '5.7.4',
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: 'Heart',
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: { a: 0, k: 0 },
                p: { a: 0, k: [50, 50, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: {
                    a: 1,
                    k: [
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100, 100, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 15, s: [120, 120, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [100, 100, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 45, s: [115, 115, 100] },
                        { t: 60, s: [100, 100, 100] },
                    ],
                },
            },
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            ty: 'sh',
                            d: 1,
                            ks: {
                                a: 0,
                                k: {
                                    c: true,
                                    v: [
                                        [0, -15],
                                        [25, -30],
                                        [25, -5],
                                        [0, 20],
                                        [-25, -5],
                                        [-25, -30],
                                    ],
                                    i: [
                                        [0, 0],
                                        [-15, 0],
                                        [0, 15],
                                        [0, 0],
                                        [0, 15],
                                        [15, 0],
                                    ],
                                    o: [
                                        [15, 0],
                                        [0, 0],
                                        [0, 0],
                                        [0, 15],
                                        [-15, 0],
                                        [0, 0],
                                    ],
                                },
                            },
                        },
                        {
                            ty: 'fl',
                            c: { a: 0, k: [0.92, 0.28, 0.6, 1] },
                            o: { a: 0, k: 100 },
                        },
                        {
                            ty: 'tr',
                            p: { a: 0, k: [0, 5] },
                            a: { a: 0, k: [0, 0] },
                            s: { a: 0, k: [100, 100] },
                            r: { a: 0, k: 0 },
                            o: { a: 0, k: 100 },
                        },
                    ],
                },
            ],
            ip: 0,
            op: 60,
            st: 0,
        },
    ],
}

// Inline fire animation data
const fireAnimationData = {
    v: '5.7.4',
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: 'Flame',
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: { a: 0, k: 0 },
                p: { a: 0, k: [50, 55, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: {
                    a: 1,
                    k: [
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100, 100, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 10, s: [95, 110, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 20, s: [105, 95, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [98, 108, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 40, s: [102, 97, 100] },
                        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 50, s: [100, 105, 100] },
                        { t: 60, s: [100, 100, 100] },
                    ],
                },
            },
            shapes: [
                {
                    ty: 'gr',
                    it: [
                        {
                            ty: 'sh',
                            d: 1,
                            ks: {
                                a: 0,
                                k: {
                                    c: true,
                                    v: [
                                        [0, -30],
                                        [15, -5],
                                        [10, 15],
                                        [0, 20],
                                        [-10, 15],
                                        [-15, -5],
                                    ],
                                    i: [
                                        [5, -10],
                                        [5, 10],
                                        [0, 5],
                                        [5, 0],
                                        [0, 5],
                                        [-5, 10],
                                    ],
                                    o: [
                                        [-5, -10],
                                        [0, 0],
                                        [5, 0],
                                        [-5, 0],
                                        [0, 0],
                                        [5, 10],
                                    ],
                                },
                            },
                        },
                        {
                            ty: 'gf',
                            o: { a: 0, k: 100 },
                            r: 1,
                            bm: 0,
                            g: {
                                p: 3,
                                k: {
                                    a: 0,
                                    k: [0, 1, 0.6, 0, 0.5, 1, 0.3, 0, 1, 0.8, 0.2, 0],
                                },
                            },
                            s: { a: 0, k: [0, 20] },
                            e: { a: 0, k: [0, -30] },
                            t: 1,
                        },
                        {
                            ty: 'tr',
                            p: { a: 0, k: [0, 0] },
                            a: { a: 0, k: [0, 0] },
                            s: { a: 0, k: [100, 100] },
                            r: { a: 0, k: 0 },
                            o: { a: 0, k: 100 },
                        },
                    ],
                },
            ],
            ip: 0,
            op: 60,
            st: 0,
        },
    ],
}

interface LottieIconProps {
    className?: string
}

export const LottieHeart: React.FC<LottieIconProps> = ({ className = '' }) => {
    return (
        <div className={`${className}`}>
            <Lottie
                animationData={heartAnimationData}
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}

export const LottieFire: React.FC<LottieIconProps> = ({ className = '' }) => {
    return (
        <div className={`${className}`}>
            <Lottie
                animationData={fireAnimationData}
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}

export default { LottieHeart, LottieFire }
