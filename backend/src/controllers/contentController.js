const Content = require('../models/Content');

const createContent = async (req, res) => {
    try{
        const { title, description, type, tags, category } = req.body;
        const filePath = req.file ? req.file.path : null; //Ruta del archivo que se sube

        const newContent = await Content.create({
            title,
            description,
            type,
            tags,
            category,
            file: filePath, //Con esto guardamos la ruta del archivo en la BD
            createdBy: req.user.id,
        });

        res.status(201).json({ success: true, data: newContent });
    } catch(error) {
        res.status(400).json({ success: false, message: error.message });
    };
};

const getAllContent = async (req, res) => {
    try{
        const contents = await Content.find().populate('createdBy', 'username');
        res.status(200).json({ success: true, data: contents });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    };
};

const getContentById = async (req, res) => {
    try{
        const content = await Content.findById(req.params.id).populate('createdBy', 'username');

        if (!content){
            return res.status(404).json({ success: false, message: "Contenido no encontrado" });
        }

        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    };
};

const updateContent = async (req, res) => {
    try{
        const { title, description, type, content, tags, category } = req.body;

        const updateContent = await Content.findByIdAndUpdate(
            req.params.id,
            { title, description, type, content, tags, category, updatedAt: Date.now() },
            { new: true }
        );

        if (!updateContent){
            return res.status(404).json({ success: false, message: "Contenido no encontrado" });
        }

        res.status(200).json({ success: true, data: updateContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    };
};

const deleteContent = async (req, res) => {
    try{
        const deleteContent = await Content.findByIdAndDelete(req.params.id);

        if (!deleteContent){
            return res.status(404).json({ success: false, message: "Contenido no encontrado" });
        }

        res.status(200).json({ success: true, message: "Contenido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const simpleSearchContent = async (req, res) => {
    try{
        const { query } = req.params;

        var filter = {};

        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } },
            ];
        }

        const results = await Content.find(filter).sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
};

module.exports = { createContent, getAllContent, getContentById, updateContent, deleteContent, simpleSearchContent };