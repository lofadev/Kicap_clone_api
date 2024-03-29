import ShipperService from '../services/ShipperService.js';
import variable from '../variable.js';

const createShipper = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json(variable.NOT_EMPTY);
    }
    const response = await ShipperService.createShipper(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getShippers = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const response = await ShipperService.getShippers(
      Number(page || 1),
      Number(limit || 10),
      search
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getShipper = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status.json(variable.REQUIRE_ID);
    }
    const response = await ShipperService.getShipper(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const updateShipper = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone } = req.body;
    console.log(req.body);
    if (!id) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'ID param là bắt buộc.',
      });
    }
    if (!name && !phone) {
      return res.status(400).json(variable.NOT_EMPTY);
    }
    const response = await ShipperService.updateShipper(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const deleteShipper = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json(variable.REQUIRE_ID);
    const response = await ShipperService.deleteShipper(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const ShipperController = {
  createShipper,
  getShippers,
  getShipper,
  updateShipper,
  deleteShipper,
};
export default ShipperController;
