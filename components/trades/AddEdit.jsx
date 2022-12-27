import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { tradeService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const trade = props?.trade;
    const isAddMode = !user;
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    

     /* id, 
    title,
    bias,
    drRange,
    winLoss,
    maxStdTarget,
    entryZone,
    timeOfEntry,
    news, */
    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        bias: Yup.string()
            .required('First Name is required'),
        winLoss: Yup.string()
            .required('Last Name is required'),
        maxStdTarget: Yup.string()
            .required('Last Name is required'),
        entryZone: Yup.string()
            .required('Role is required'),
        timeOfEntry: Yup.string()
            .required('Last Name is required'),
        news: Yup.string()
            .required('Last Name is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        const { ...defaultValues } = trade;
        formOptions.defaultValues = defaultValues;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(trade.id, data);
    }

    function createUser(data) {
        return tradeService.create(data)
            .then(() => {
                alertService.success('Trade added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return tradeService.update(id, data)
            .then(() => {
                alertService.success('Trade updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isAddMode ? 'Add Trade' : 'Edit Trade'}</h1>
            <div className="form-row">
                <div className="form-group col">
                <label>Title</label>
                    <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Bias</label>
                    <input name="bias" type="text" {...register('bias')} className={`form-control ${errors.bias ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.bias?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>DR Range</label>
                    <input name="drRange" type="text" {...register('drRange')} className={`form-control ${errors.drRange ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.drRange?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Win/Loss</label>
                    <select name="winLoss" {...register('winLoss')} className={`form-control ${errors.maxStdTarget ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="win">Win</option>
                        <option value="loss">Loss</option>
                    </select>
                    <div className="invalid-feedback">{errors.winLoss?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Std Target</label>
                    <select name="maxStdTarget" {...register('maxStdTarget')} className={`form-control ${errors.maxStdTarget ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value=".5">.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                        <option value="3.5">3.5</option>
                        <option value="4">4</option>
                        <option value="4.5">4.5</option>
                        <option value="5">5</option>
                    </select>
                    <div className="invalid-feedback">{errors.maxStdTarget?.message}</div>
                    <div className="form-group col">
                    <label>Entry Zone</label>
                    <select name="entryZone" {...register('entryZone')} className={`form-control ${errors.entryZone ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="1">High DR/IDR</option>
                        <option value="2">MidLine</option>
                        <option value="3">Low DR/IDR</option>
                        <option value="4">Below Range</option>
                    </select>
                    <div className="invalid-feedback">{errors.entryZone?.message}</div>
                </div>
                </div>
            </div>
            {!isAddMode &&
                <div>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
                </div>
            }
            <div className="form-row">
                <div className="form-group col">
                    <label>
                        Password
                        {!isAddMode &&
                            (!showPassword
                                ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
                                : <em> - {user.password}</em>
                            )
                        }
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Confirm Password</label>
                    <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}