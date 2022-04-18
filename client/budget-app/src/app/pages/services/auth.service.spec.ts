import { TestBed } from '@angular/core/testing'
import {
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from './auth.service'

describe('AuthService Test', () => {
    const loginUrl = 'http://localhost:3000/login'
    let service: AuthService
    let httpController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
        })

        service = TestBed.inject(AuthService)
        httpController = TestBed.inject(HttpTestingController)
    })

    it('Authorization service should be created', () => {
        expect(service).toBeTruthy()
    })

    describe('Login', () => {
        it('should return access token refresh token and expires in', (done: DoneFn) => {
            const mockResponse = {
                accessToken: 'accessToken',
                expiresIn: 10000,
                refreshToken: 'refreshToken',
            }
            service.login('ak@mk.com', '12345').subscribe({
                next: (res) => {
                    expect(res).toEqual(mockResponse)
                    done()
                },
            })
            const req = httpController.expectOne({
                method: 'POST',
                url: loginUrl,
            })
            req.flush(mockResponse)
        })
        it('setSession has to been called on success', (done: DoneFn) => {
            spyOn(service as any, 'setSession')
            const expectedResult = {
                accessToken: 'accessToken',
                expiresIn: 10000,
                refreshToken: 'refreshToken',
            }
            service.login('ak@mk.com', '12345').subscribe(() => {
                expect((service as any).setSession).toHaveBeenCalledOnceWith(
                    expectedResult
                )
                done()
            })
            const req = httpController.expectOne({
                method: 'POST',
                url: loginUrl,
            })
            req.flush(expectedResult)
        })
        it('setSession has not been called on error', (done: DoneFn) => {
            spyOn(service as any, 'setSession')
            service.login('jbdbf@gmail.com', 'bubyvyv').subscribe({
                error: (e) => {
                    expect((service as any).setSession).not.toHaveBeenCalled()
                    done()
                },
            })

            const req = httpController.expectOne({
                method: 'POST',
                url: loginUrl,
            })
            req.error(new ProgressEvent('401'))
        })
    })
})
