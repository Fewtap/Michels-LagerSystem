"use client";
import type { Database } from "@/Types/database.types";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { HTMLAttributes, ReactNode, useRef } from "react";

interface CardProps {
    children: ReactNode;
    onClick?: HTMLAttributes<HTMLDivElement>['onClick']
}

const Card: React.FC<CardProps> = (
    { children, onClick }
) => {
    const cardRef = useRef<HTMLDivElement>(null); // Ref to get the card's position
    
    return (
        <motion.div
            onClick={onClick}
            ref={cardRef} // Assign the ref to the motion.div
            
            whileHover={{
                scale: 1.01,
                // Using 'outline' might override 'outlineWidth' if not careful.
                // It's generally better to set them separately or use a shorthand.
                // Here, let's just make the outline color change and keep width separate for clarity.
                outline: "2px solid #D4D2D5", // This sets width, style, and color.
                // outlineWidth: "10px", // This would be overridden by the 'outline' shorthand above if it was applied *after*.
                // If you want to animate the outline width on hover, you would animate it like this:
                // outlineWidth: "10px", // or whatever value you desire
                transition: {
                    duration: 0.1,
                    ease: "backInOut",
                    bounce: 0.1,
                },
            }}
            whileTap={{
                scale: 1.02
            }}
          
            
            className="border p-4 rounded-2xl m-2 bg-[#593161] text-[#D4D2D5]"
        >
            {children}
           
        </motion.div>
    );
};
export default Card;