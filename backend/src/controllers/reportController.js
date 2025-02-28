const Report = require('../models/reportModel');

//Reportar contenido
const createReport = async (req, res) => {
    try {
        const { reportedContent, contentType, reason } = req.body;

        const report = await Report.create({
            reporter: req.user.id,
            reportedContent,
            contentType,
            reason,
        })

        res.status(201).json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtener reportes de contenido
const getReports = async (req, res) => {
    try {
        if (!req.user.role === 'admin') {
            return res.status(401).json({ success: false, message: 'No autorizado' });
        }

        const reports = await Report.find().populate('reporter', 'username email').sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReportStatus = async (req, res) => {
    try {
        if (!req.user.role === 'admin') {
            return res.status(401).json({ success: false, message: 'No Autorizado' });
        }

        const { status } = req.body;
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ success: false, message: 'Reporte no encontrado' });
        }

        report.status = status;
        await report.save();

        res.status(200).json({ success: true, message: 'Estado del reporte actualizado', data: report });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createReport, getReports, updateReportStatus };