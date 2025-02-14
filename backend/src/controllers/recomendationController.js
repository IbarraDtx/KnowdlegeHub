const Content = require('../models/Content');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

//Obtener recomendaciones basadas en intereses del usuario
const getRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        //Buscar las categorías más vistas por el usuario
        const userContents = await Content.find({ _id: { $in: user.savedContents } });
        const favoriteCategories = userContents.map(content => content.category);

        //Buscar contenido con esas categorías, excluyendo las que ya tiene el usuario
        var recommendedContents = await Content.find({
            category: { $in: favoriteCategories },
            _id: { $nin: user.savedContents }
        }).limit(5); //Limitar a 5 recomendaciones

        //Si no hay suficiente contenido, añadimos las mas populares
        if (recommendedContents.length < 5) {
            const popularContents = await Content.find()
                .sort({ views: -1 }) //Ordenar por vistas
                .limit(5 - recommendedContents.length);

            recommendedContents = [...recommendedContents, ...popularContents];
        }

        res.status(200).json({ success: true, data: recommendedContents });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRecommendations };