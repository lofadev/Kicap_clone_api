import UserService from '../services/UserService.js';
import { isEmail, isVietNamPhoneNumber, refreshTokenService } from '../utils/index.js';

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Không được bỏ trống.',
      });
    } else if (!isEmail(email)) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Email sai định dạng.',
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Mật khẩu không trùng khớp.',
      });
    } else if (!isVietNamPhoneNumber(phone)) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Số điện thoại này phải thuộc vùng Việt Nam.',
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { isAdmin, ...data } = req.body;
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'UserID param là bắt buộc.',
      });
    }
    const { first_name, last_name, phone, email, password } = data;
    if (first_name === '' || last_name === '' || phone === '' || email === '' || password == '') {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Không được bỏ trống.',
      });
    }
    let response;
    if (res.isAdmin) {
      response = await UserService.updateUser(userId, req.body);
    } else {
      if (isAdmin) {
        return res.status(200).json({
          status: 'ERROR',
          message: 'Not permission',
        });
      }
      response = await UserService.updateUser(userId, data);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'UserID param là bắt buộc.',
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Không được bỏ trống.',
      });
    } else if (!isEmail(email)) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Email sai định dạng',
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token } = response;
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json({
      status: 'OK',
      message: 'Lấy tất cả user có trong database.',
      data: response,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'UserId là bắt buộc.',
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Token là bắt buộc.',
      });
    }
    const response = await refreshTokenService(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({
      status: 'OK',
      message: 'Đăng xuất thành công.',
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const UserController = {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
};
export default UserController;
