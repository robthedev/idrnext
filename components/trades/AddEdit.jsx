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
    const isAddMode = !trade;
    const router = useRouter();
    
    console.info(trade)

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        bias: Yup.string()
            .required('Bias is required'),
        drRange: Yup.string()
            .required('DR range is required'),
        winLoss: Yup.string()
            .required('Win/loss is required'),
        maxProfit: Yup.string()
            .required('maxProfit is required'),
        entryZone: Yup.string()
            .required('entry zone is required'),
        imgUrl: Yup.string()
            .required('image is required'),
        date: Yup.string()
            .required('date is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        const { ...defaultValues } = trade;
        formOptions.defaultValues = defaultValues;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);

    console.info(formOptions)
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createTrade(data)
            : updateTrade(trade.id, data);
    }

    function createTrade(data) {
        return tradeService.create(data)
            .then(() => {
                alertService.success('Trade added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateTrade(id, data) {
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
                <div className="form-group col-4">
                <label>Title</label>
                    <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group col-1">
                    <label>Bias</label>
                    <select name="bias" {...register('bias')} className={`form-control ${errors.bias ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="win">Long</option>
                        <option value="loss">Short</option>
                    </select>
                    <div className="invalid-feedback">{errors.bias?.message}</div>
                </div>
                <div className="form-group col-1">
                    <label>DR Range</label>
                    <input name="drRange" type="text" {...register('drRange')} className={`form-control ${errors.drRange ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.drRange?.message}</div>
                </div>
                <div className="form-group col-1">
                    <label>Win/Loss</label>
                    <select name="winLoss" {...register('winLoss')} className={`form-control ${errors.winLoss ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="win">Win</option>
                        <option value="loss">Loss</option>
                    </select>
                    <div className="invalid-feedback">{errors.winLoss?.message}</div>
                </div>
                <div className="form-group col-1">
                <label>Max Profit</label>
                    <input name="maxProfit" type="text" {...register('maxProfit')} className={`form-control ${errors.maxProfit ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.maxProfit?.message}</div>
                </div>
                <div className="form-group col-1">
                <label>Max DD</label>
                    <input name="drawDown" type="text" {...register('drawDown')} className={`form-control ${errors.drawDown ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.drawDown?.message}</div>
                </div>
                <div className="form-group col-1">
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
                </div>
                <div className="form-group col-1">
                    <label>News</label>
                    <select name="news" {...register('news')} className={`form-control ${errors.news ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="1">True</option>
                        <option value="0">False</option>
                    </select>
                    <div className="invalid-feedback">{errors.news?.message}</div>
                </div>
            </div>
            <div className="form-row">
            <div className="form-group col-2">
                    <label>Entry Zone</label>
                    <select name="entryZone" {...register('entryZone')} className={`form-control ${errors.entryZone ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="High DR/IDR">High DR/IDR</option>
                        <option value="Mid Zone">MidZone</option>
                        <option value="Low DR/IDR">Low DR/IDR</option>
                        <option value="Below Range">Below Range</option>
                        <option value="Above Range">Above Range</option>
                    </select>
                    <div className="invalid-feedback">{errors.entryZone?.message}</div>
                </div>
                <div className="form-group col-2">
                    <label>Date</label>
                    <input name="date" type="date" {...register('date',  {
                        valueAsDate: true,
                    })} className={`form-control ${errors.date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date?.message}</div>
                </div>
                <div className="form-group col-2">
                    <label>Enry Time</label>
                    <input name="entryTime" type="time" {...register('entryTime')} className={`form-control ${errors.entryTime ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.entryTime?.message}</div>
                </div>
                <div className="form-group col-2">
                    <label>Exit Time</label>
                    <input name="exitTime" type="time" {...register('exitTime')} className={`form-control ${errors.exitTime ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.exitTime?.message}</div>
                </div>
                <div className="form-group col-3">
                    <label>ImgUrl</label>
                    <input name="imgUrl" type="text" {...register('imgUrl')} className={`form-control ${errors.imgUrl ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.imgUrl?.message}</div>
                </div>
            </div>
            <div className="form-row">
            <div className="form-group col-4">
                    <label>Notes</label>
                    <textarea name="notes" type="text" {...register('notes')} className={`form-control ${errors.notes ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.notes?.message}</div>
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