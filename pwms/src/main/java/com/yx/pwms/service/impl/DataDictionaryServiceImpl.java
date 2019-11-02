package com.yx.pwms.service.impl;

import com.yx.pwms.dao.DataDictionaryDao;
import com.yx.pwms.entity.DataDictionary;
import com.yx.pwms.service.DataDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DataDictionaryServiceImpl implements DataDictionaryService {

    @Autowired
    private DataDictionaryDao dataDictionaryDao;

    @Override
    public int insertDataDictionary(DataDictionary dataDictionary) {
        return dataDictionaryDao.insertDataDictionary(dataDictionary);
    }

    @Override
    public int delDataDictionary(long dicId) {
        return dataDictionaryDao.delDataDictionary(dicId);
    }

    @Override
    public List<DataDictionary> queryAll() {
        return dataDictionaryDao.queryAll();
    }

    @Override
    public List<DataDictionary> queryBy(Map<String, String> map) {
        return dataDictionaryDao.queryBy(map);
    }

    @Override
    public DataDictionary queryByDataDictionaryId(long dicId) {
        return dataDictionaryDao.queryByDataDictionaryId(dicId);
    }

    @Override
    public int queryExist(long dicId) {
        if (dataDictionaryDao.queryByDataDictionaryId(dicId) != null){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int updateDataDictionary(DataDictionary dataDictionary) {
        return dataDictionaryDao.updateDataDictionary(dataDictionary);
    }
}
