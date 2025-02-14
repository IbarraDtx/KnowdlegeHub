const SavedContent = require('../models/savedContentModel');

//Agregar el contenido a la lista de favoritos
const savedContent = async (req, res) => {
    try{
        const { contentId } = req.body;
        const userId = req.user.id;

        var savedList = await SavedContent.findOne({ user: userId });

        if (!savedList){
            savedList = new SavedContent({ user: userId, savedItems: [] });
        }

        //Verificar si el contenido ya está en la lista
        const exists = savedList.savedItems.some(item => item.content.toString() === contentId);
        if (exists) {
            return res.status(400).json({ success: false, message: 'El contenido ya está en la lista de favoritos' });
        }

        savedList.savedItems.push({ content: contentId });
        await savedList.save();

        res.status(200).json({ success: true, message: 'Contenido guardado exitosamente', data: savedList});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Marcar o desmarcar contenido como favorito
const toggleFavorite = async (req, res) => {
    try {
        const { contentId } = req.body;
        const userId = req.user.id;

        const savedList = await SavedContent.findOne({ user: userId });

        if (!savedList) {
            return res.status(404).json({ success: false, message: 'Lista de favoritos no encontrada' });
        }

        const item = savedList.savedItems.find(item => item.content.toString() === contentId);
        if (!item) {
            return res.status(404).json({ success: false, messsage: 'Contenido no encontrado en la lista de favoritos' });
        }

        item.isFavorite = !item.isFavorite;
        await savedList.save();

        res.status(200).json({ success: true, message: 'Contenido actualizado exitosamente', data: savedList });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

//Obtener lista de favoritos
const getSavedContent = async (req, res) => {
    try {
        const userId = req.user.id;

        const savedList = await SavedContent.findOne({ user: userId }).populate('savedItems.content');

        if (!savedList) {
            return res.status(400).json({ success: false, message: 'Lista de favoritos no encontrada' });
        }

        res.status(200).json({ success: true, data: savedList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Eliminar contenido de la lista de favoritos
const deleteSavedContent = async (req, res) => {
    try {
        const { contentId } = req.body;
        const userId = req.user.id;

        const savedList = await SavedContent.findOne({ user: userId });

        if (!savedList) {
            return res.status(404).json({ success: false, message: 'Lista de favoritos no encontrada' });
        }

        savedList.savedItems = savedList.savedItems.filter(item => item.content.toString() !== contentId);
        await savedList.save();

        res.status(200).json({ success: true, message: 'Contenido eliminado de la lista de favoritos', data: savedList });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { savedContent, toggleFavorite, getSavedContent, deleteSavedContent };