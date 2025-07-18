import { Request, Response } from 'express';
import { firestoreService } from '../services/firestoreService';

export const scheduleController = {
  // 개인 일정 목록 조회
  async getPersonalSchedules(_req: Request, res: Response) {
    try {
      const schedules = await firestoreService.getPersonalSchedules();
      
      res.status(200).json({
        success: true,
        data: schedules,
        message: '개인 일정 목록 조회 성공',
        count: schedules.length
      });
    } catch (error) {
      console.error('개인 일정 조회 실패:', error);
      res.status(500).json({
        success: false,
        error: '개인 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 부서 일정 목록 조회
  async getDepartmentSchedules(_req: Request, res: Response) {
    try {
      const schedules = await firestoreService.getDepartmentSchedules();
      
      res.status(200).json({
        success: true,
        data: schedules,
        message: '부서 일정 목록 조회 성공',
        count: schedules.length
      });
    } catch (error) {
      console.error('부서 일정 조회 실패:', error);
      res.status(500).json({
        success: false,
        error: '부서 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 프로젝트 일정 목록 조회
  async getProjectSchedules(_req: Request, res: Response) {
    try {
      const schedules = await firestoreService.getProjectSchedules();
      
      res.status(200).json({
        success: true,
        data: schedules,
        message: '프로젝트 일정 목록 조회 성공',
        count: schedules.length
      });
    } catch (error) {
      console.error('프로젝트 일정 조회 실패:', error);
      res.status(500).json({
        success: false,
        error: '프로젝트 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 모든 일정 조회 (통합)
  async getAllSchedules(_req: Request, res: Response) {
    try {
      console.log('🔍 전체 일정 조회 시작...');
      const allSchedules = await firestoreService.getAllSchedules();
      console.log('✅ 전체 일정 조회 성공:', {
        personal: allSchedules.personal?.length || 0,
        department: allSchedules.department?.length || 0,
        project: allSchedules.project?.length || 0,
        company: allSchedules.company?.length || 0
      });
      
      res.status(200).json({
        success: true,
        data: allSchedules,
        message: '전체 일정 목록 조회 성공',
        count: {
          personal: allSchedules.personal?.length || 0,
          department: allSchedules.department?.length || 0,
          project: allSchedules.project?.length || 0,
          company: allSchedules.company?.length || 0,
          total: (allSchedules.personal?.length || 0) + (allSchedules.department?.length || 0) + (allSchedules.project?.length || 0) + (allSchedules.company?.length || 0)
        }
      });
    } catch (error) {
      console.error('❌ 전체 일정 조회 실패:', error);
      res.status(500).json({
        success: false,
        error: '전체 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류',
        details: process.env['NODE_ENV'] === 'development' ? error : undefined
      });
    }
  },

  // === 개인 일정 CRUD ===
  // 개인 일정 생성
  async createPersonalSchedule(req: Request, res: Response) {
    try {
      const schedule = await firestoreService.createPersonalSchedule(req.body);
      
      res.status(201).json({
        success: true,
        data: schedule,
        message: '개인 일정 생성 성공'
      });
    } catch (error) {
      console.error('개인 일정 생성 실패:', error);
      res.status(500).json({
        success: false,
        error: '개인 일정을 생성하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 개인 일정 상세 조회
  async getPersonalScheduleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      const schedule = await firestoreService.getPersonalScheduleById(id);
      
      if (!schedule) {
        return res.status(404).json({
          success: false,
          error: '개인 일정을 찾을 수 없습니다.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: schedule,
        message: '개인 일정 조회 성공'
      });
    } catch (error) {
      console.error('개인 일정 조회 실패:', error);
      return res.status(500).json({
        success: false,
        error: '개인 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 개인 일정 수정
  async updatePersonalSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      const schedule = await firestoreService.updatePersonalSchedule(id, req.body);
      
      if (!schedule) {
        return res.status(404).json({
          success: false,
          error: '개인 일정을 찾을 수 없습니다.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: schedule,
        message: '개인 일정 수정 성공'
      });
    } catch (error) {
      console.error('개인 일정 수정 실패:', error);
      return res.status(500).json({
        success: false,
        error: '개인 일정을 수정하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 개인 일정 삭제
  async deletePersonalSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      await firestoreService.deletePersonalSchedule(id);
      
      return res.status(200).json({
        success: true,
        message: '개인 일정 삭제 성공'
      });
    } catch (error) {
      console.error('개인 일정 삭제 실패:', error);
      return res.status(500).json({
        success: false,
        error: '개인 일정을 삭제하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // === 부서 일정 CRUD ===
  // 부서 일정 생성
  async createDepartmentSchedule(req: Request, res: Response) {
    try {
      const schedule = await firestoreService.createDepartmentSchedule(req.body);
      
      res.status(201).json({
        success: true,
        data: schedule,
        message: '부서 일정 생성 성공'
      });
    } catch (error) {
      console.error('부서 일정 생성 실패:', error);
      res.status(500).json({
        success: false,
        error: '부서 일정을 생성하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 부서 일정 상세 조회
  async getDepartmentScheduleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      const schedule = await firestoreService.getDepartmentScheduleById(id);
      
      if (!schedule) {
        return res.status(404).json({
          success: false,
          error: '부서 일정을 찾을 수 없습니다.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: schedule,
        message: '부서 일정 조회 성공'
      });
    } catch (error) {
      console.error('부서 일정 조회 실패:', error);
      return res.status(500).json({
        success: false,
        error: '부서 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 부서 일정 수정
  async updateDepartmentSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      const schedule = await firestoreService.updateDepartmentSchedule(id, req.body);
      
      if (!schedule) {
        return res.status(404).json({
          success: false,
          error: '부서 일정을 찾을 수 없습니다.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: schedule,
        message: '부서 일정 수정 성공'
      });
    } catch (error) {
      console.error('부서 일정 수정 실패:', error);
      return res.status(500).json({
        success: false,
        error: '부서 일정을 수정하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 부서 일정 삭제
  async deleteDepartmentSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      await firestoreService.deleteDepartmentSchedule(id);
      
      return res.status(200).json({
        success: true,
        message: '부서 일정 삭제 성공'
      });
    } catch (error) {
      console.error('부서 일정 삭제 실패:', error);
      return res.status(500).json({
        success: false,
        error: '부서 일정을 삭제하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // === 프로젝트 일정 CRUD ===
  // 프로젝트 일정 생성
  async createProjectSchedule(req: Request, res: Response) {
    try {
      const schedule = await firestoreService.createProjectSchedule(req.body);
      
      res.status(201).json({
        success: true,
        data: schedule,
        message: '프로젝트 일정 생성 성공'
      });
    } catch (error) {
      console.error('프로젝트 일정 생성 실패:', error);
      res.status(500).json({
        success: false,
        error: '프로젝트 일정을 생성하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 프로젝트 일정 상세 조회
  async getProjectScheduleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      const schedule = await firestoreService.getProjectScheduleById(id);
      
      if (!schedule) {
        return res.status(404).json({
          success: false,
          error: '프로젝트 일정을 찾을 수 없습니다.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: schedule,
        message: '프로젝트 일정 조회 성공'
      });
    } catch (error) {
      console.error('프로젝트 일정 조회 실패:', error);
      return res.status(500).json({
        success: false,
        error: '프로젝트 일정을 조회하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 프로젝트 일정 수정
  async updateProjectSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      const schedule = await firestoreService.updateProjectSchedule(id, req.body);
      
      if (!schedule) {
        return res.status(404).json({
          success: false,
          error: '프로젝트 일정을 찾을 수 없습니다.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: schedule,
        message: '프로젝트 일정 수정 성공'
      });
    } catch (error) {
      console.error('프로젝트 일정 수정 실패:', error);
      return res.status(500).json({
        success: false,
        error: '프로젝트 일정을 수정하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  },

  // 프로젝트 일정 삭제
  async deleteProjectSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID가 필요합니다.'
        });
      }
      await firestoreService.deleteProjectSchedule(id);
      
      return res.status(200).json({
        success: true,
        message: '프로젝트 일정 삭제 성공'
      });
    } catch (error) {
      console.error('프로젝트 일정 삭제 실패:', error);
      return res.status(500).json({
        success: false,
        error: '프로젝트 일정을 삭제하는 중 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : '알 수 없는 오류'
      });
    }
  }
};