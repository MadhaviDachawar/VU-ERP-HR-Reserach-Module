import { TestBed } from '@angular/core/testing';

// import { StaffService } from './staff.service';
import { staff_NonTeachingService } from './staff_NonTeaching.service';

describe('StaffServicestaff_NonTeaching', () => {
    let service: staff_NonTeachingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(staff_NonTeachingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
