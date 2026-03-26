import {Star} from "lucide-react";
import React from 'react';
import opinionsJson from '../../dummyData/Opinions.json';


interface OpinionData {
    id: number;
    name: string;
    role: string;
    valoration?: number;
    text: string;
    photo?: string;
}

function Opinion() {
    const opinions: OpinionData[] = opinionsJson.opinions;

    function renderStars(rating: number | undefined, max = 5) {
        //define the number of stars to show based on the rating, ensuring its between 0 and max
        const normalized = Math.max(0, Math.min(max, Math.round(rating ?? 0)));
        //create an array of stars, filling them based on the normalized rating
        const stars = Array.from({ length: max }, (_, index) => {
            const filled = index < normalized;
            return (
                <Star
                    key={index}
                    size={16}
                    className={
                        filled ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'
                    }
                />
            );
        });
        return <div className="flex items-center gap-1">{stars}</div>;
    }

    return (
        <div id="opinions">
            <div className="m-10">
                <h1 className="col-span-full text-4xl lg:text-6xl font-bold text-foreground mb-6  text-center">
                    Lo que dicen nuestros
                <span className="text-primary block">Clientes</span>
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opinions.map((opinion) => (
                    <div key={opinion.id} className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">{opinion.name}</h3>
                            {renderStars(opinion.valoration)}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{opinion.role}</p>
                        <p className="text-gray-700">{opinion.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Opinion;