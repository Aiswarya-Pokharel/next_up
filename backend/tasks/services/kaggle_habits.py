import os
import zipfile
import pandas as pd
from django.core.cache import cache
from django.conf import settings

CACHE_KEY = "habit_presets_dataset"
CACHE_TTL = 60 * 60 * 24  # 24 hours
DATASET_REF = "aishwarya2060/dailyhabits-dataset"
DOWNLOAD_DIR = os.path.join(settings.BASE_DIR, "tasks", "data_cache")


# def _download_and_parse():
#     from kaggle.api.kaggle_api_extended import KaggleApi

#     os.makedirs(DOWNLOAD_DIR, exist_ok=True)

#     api = KaggleApi()
#     api.authenticate()
#     api.dataset_download_files(DATASET_REF, path=DOWNLOAD_DIR, unzip=False)

#     zip_path = os.path.join(DOWNLOAD_DIR, "dailyhabits-dataset.zip")
#     with zipfile.ZipFile(zip_path, "r") as z:
#         z.extractall(DOWNLOAD_DIR)

#     csv_path = os.path.join(DOWNLOAD_DIR, "habit_dataset.csv")
#     df = pd.read_csv(csv_path)

#     # Convert suggested_time "08:00,12:00" into a real list
#     df["suggested_time"] = df["suggested_time"].apply(
#         lambda s: [t.strip() for t in str(s).split(",")]
#     )

#     return df.to_dict(orient="records")

def _download_and_parse():
    from kaggle.api.kaggle_api_extended import KaggleApi
    import glob

    os.makedirs(DOWNLOAD_DIR, exist_ok=True)

    api = KaggleApi()
    api.authenticate()
    api.dataset_download_files(DATASET_REF, path=DOWNLOAD_DIR, unzip=True)  # unzip=True skips manual zip handling

    csv_files = glob.glob(os.path.join(DOWNLOAD_DIR, "*.csv"))
    if not csv_files:
        raise FileNotFoundError(f"No CSV found in {DOWNLOAD_DIR} after download")

    df = pd.read_csv(csv_files[0])

    df["suggested_time"] = df["suggested_time"].apply(
        lambda s: [t.strip() for t in str(s).split(",")]
    )

    return df.to_dict(orient="records")

def get_habit_presets(force_refresh=False):
    if not force_refresh:
        cached = cache.get(CACHE_KEY)
        if cached is not None:
            return cached

    data = _download_and_parse()
    cache.set(CACHE_KEY, data, CACHE_TTL)
    return data