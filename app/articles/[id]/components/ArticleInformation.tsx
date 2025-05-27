"use client";

import { Article } from "@/Types/database.types";
import { Paper } from "@mui/material";
import { useState } from "react";

type ArticleInformationProps = {
    article: Article;
    className?: string;
};

const  ArticleInformation = ({ article, className }: ArticleInformationProps) => {

    

    return (
        <Paper elevation={24}  className={`grid grid-cols-1 gap-6 text-black p-8 ${className ?? ""}`}>
            {/* Article Details */}
            <Paper elevation={0}className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">
                    Article Details
                </h2>
                <p className="mb-2">
                    <strong>EAN:</strong> {article.EAN}
                </p>
                <p className="mb-2">
                    <strong>PCS:</strong> {article.PCS}
                </p>
                <p className="mb-2">
                    <strong>Size:</strong> {article.Size}
                </p>
                <p className="mb-2">
                    <strong>Unit:</strong> {article.Unit}
                </p>
                <p className="mb-2">
                    <strong>Article ID:</strong> {article.article_id}
                </p>
            </Paper>
        </Paper>
    );
}

export default ArticleInformation;
