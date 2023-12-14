const conn = require('../db/conn')

const { response } = require("express")

module.exports = class ProductController{
    static getAllProduct(request, response){
        try {
            const sql = `SELECT * FROM tb_lista`;
            conn.query(sql, (err, data) =>{
                if (err) {
                    console.log(err);
                }

                const products  = data
                console.log(products );
                return response.render("product/home", { products });
            })
        } catch (error) {
            console.log(error);
            response.status(500).json("error no servidor", {product})
        }
       
    }

    static createProduct(request, response){
        try {
            if (!request.body.nome || !request.body.quantidade) {
                return response.status().json({
                    message: "Por favor, Preencha todos os campos"
                });
            }

            const {nome, quantidade} = request.body
            //DML -> manipulação
            const sql = `INSERT INTO tb_lista (nome, quantidade) VALUES ("${nome}", "${quantidade}")`;

            conn.query(sql, (err) =>{
                if (err) {
                    console.log(err);
                }
                return response.redirect('/product')
            })
        
        } catch (error) {
            console.log(error);
            response.status(500).json("error no servidor")
        }
    
    }

    static getProduct(request, response){
        try {
            const {id } = request.params

            const sql = `SELECT * FROM tb_lista WHERE id=${id}`

            conn.query(sql, (err, data) =>{
                if (err) {
                   console.log(err); 
                }

                const product = data[0]
                console.log(product);
                return response.render('product/update', {product})
            })
        } catch (error) {
            
        }
    }

    static updateProduct(request, response){}

    static removeProduct(request, response){
        try {
            const {id} = request.body

            const sql = `DELETE FROM tb_lista WHERE id = ${id}`

            conn.query(sql, (err)=>{
                if (err) {
                    console.log(err);
                }
                return response.redirect('/product')
            })
        } catch (error) {
            console.log(error);
            response.status(500).json("Error no servidor")
        }
    }
 
};